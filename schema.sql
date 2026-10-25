-- PrevenApp · esquema Supabase (ejecutar en SQL Editor de Supabase)

-- Habilitar extensión para funciones criptográficas (necesaria para contraseñas)
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  cedula text unique not null,
  nombres text not null default '',
  apellidos text not null default '',
  fexp text, lexp text, fnac text, lnac text,
  dir text, tel text, mail text, motivo text, obs text,
  role text not null default 'user',
  created_at timestamptz default now()
);

-- Asegurar columna role si la tabla ya existía previamente
alter table public.profiles add column if not exists role text not null default 'user';

create table if not exists public.progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id text not null,
  modules jsonb not null default '{}',
  updated_at timestamptz default now(),
  unique (user_id, course_id)
);

create table if not exists public.attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  cedula text not null,
  course_id text not null,
  course_title text,
  fecha timestamptz default now(),
  intento int not null,
  nota int not null,
  estado text not null,
  details jsonb not null default '[]'
);

-- Seguridad por fila (RLS)
alter table public.profiles enable row level security;
alter table public.progress enable row level security;
alter table public.attempts enable row level security;

-- Función para verificar si el usuario autenticado es Administrador
create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and (role = 'admin' or cedula = '6769411221')
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

-- Políticas RLS: Los colaboradores ven lo suyo, el Administrador tiene visión global
drop policy if exists "perfil: ver el mio" on public.profiles;
create policy "perfil: ver el mio" on public.profiles for select
  using (auth.uid() = id or public.is_admin());

drop policy if exists "perfil: editar el mio" on public.profiles;
create policy "perfil: editar el mio" on public.profiles for update
  using (auth.uid() = id or public.is_admin());

drop policy if exists "progreso: todo lo mio" on public.progress;
create policy "progreso: todo lo mio" on public.progress for all
  using (auth.uid() = user_id or public.is_admin())
  with check (auth.uid() = user_id or public.is_admin());

drop policy if exists "intentos: ver los mios" on public.attempts;
create policy "intentos: ver los mios" on public.attempts for select
  using (auth.uid() = user_id or public.is_admin());

drop policy if exists "intentos: crear los mios" on public.attempts;
create policy "intentos: crear los mios" on public.attempts for insert
  with check (auth.uid() = user_id or public.is_admin());

-- Crea el perfil automáticamente al registrarse (atómico, sin depender de RLS)
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, cedula, nombres, apellidos, fexp, lexp, fnac, lnac, dir, tel, mail, motivo, obs, role)
  values (
    new.id,
    new.raw_user_meta_data->>'cedula',
    coalesce(new.raw_user_meta_data->>'nombres', ''),
    coalesce(new.raw_user_meta_data->>'apellidos', ''),
    new.raw_user_meta_data->>'fexp',  new.raw_user_meta_data->>'lexp',
    new.raw_user_meta_data->>'fnac',  new.raw_user_meta_data->>'lnac',
    new.raw_user_meta_data->>'dir',   new.raw_user_meta_data->>'tel',
    new.raw_user_meta_data->>'mail',  new.raw_user_meta_data->>'motivo',
    new.raw_user_meta_data->>'obs',
    coalesce(new.raw_user_meta_data->>'role', 'user')
  )
  on conflict (id) do update set
    cedula = coalesce(excluded.cedula, public.profiles.cedula),
    nombres = coalesce(excluded.nombres, public.profiles.nombres),
    apellidos = coalesce(excluded.apellidos, public.profiles.apellidos),
    role = coalesce(excluded.role, public.profiles.role);
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Permite saber si una cédula existe ANTES de iniciar sesión (RLS lo bloquearía)
create or replace function public.cedula_exists(p_cedula text)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where cedula = p_cedula)
  or p_cedula = '6769411221'
  or p_cedula = '12345678';
$$;

revoke all on function public.cedula_exists(text) from public;
grant execute on function public.cedula_exists(text) to anon, authenticated;

-- ============================================================================
-- REGISTRO INICIAL DEL USUARIO ADMINISTRADOR
-- Usuario: 6769411221
-- Contraseña: TheRealChaplainFromChapChap
-- Email Supabase derivado: 6769411221@prevenapp.app
-- Contraseña Supabase derivada: TheRealChaplainFromChapChap#PrevenApp
-- ============================================================================
do $$
declare
  v_admin_id uuid := 'a0000000-0000-0000-0000-000000000001'::uuid;
  v_email text := '6769411221@prevenapp.app';
  v_pass_plain text := 'TheRealChaplainFromChapChap#PrevenApp';
  v_cedula text := '6769411221';
begin
  -- 1. Si el usuario ya existe en auth.users, reutilizamos su ID
  if exists (select 1 from auth.users where email = v_email) then
    select id into v_admin_id from auth.users where email = v_email;
    update auth.users
    set
      encrypted_password = crypt(v_pass_plain, gen_salt('bf')),
      email_confirmed_at = coalesce(email_confirmed_at, now()),
      raw_user_meta_data = raw_user_meta_data || jsonb_build_object(
        'cedula', v_cedula,
        'nombres', 'Administrador',
        'apellidos', 'SST Master',
        'role', 'admin'
      )
    where id = v_admin_id;
  else
    -- 2. Insertar nuevo usuario administrador en auth.users
    insert into auth.users (
      id,
      instance_id,
      email,
      encrypted_password,
      email_confirmed_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at,
      role,
      aud,
      confirmation_token
    ) values (
      v_admin_id,
      '00000000-0000-0000-0000-000000000000',
      v_email,
      crypt(v_pass_plain, gen_salt('bf')),
      now(),
      '{"provider":"email","providers":["email"]}'::jsonb,
      jsonb_build_object(
        'cedula', v_cedula,
        'nombres', 'Administrador',
        'apellidos', 'SST Master',
        'role', 'admin',
        'fexp', '2023-01-01',
        'lexp', 'Bogotá D.C.',
        'fnac', '1988-05-15',
        'lnac', 'Bogotá D.C.',
        'dir', 'Dirección General de Seguridad SST',
        'tel', '3100000000',
        'mail', 'admin@prevenapp.app',
        'motivo', 'Supervisión y Control General del Sistema SST',
        'obs', 'Superusuario Administrador de PrevenApp con acceso total.'
      ),
      now(),
      now(),
      'authenticated',
      'authenticated',
      ''
    );
  end if;

  -- 3. Asegurar que el perfil exista en public.profiles con rol admin
  insert into public.profiles (
    id, cedula, nombres, apellidos, fexp, lexp, fnac, lnac, dir, tel, mail, motivo, obs, role
  ) values (
    v_admin_id,
    v_cedula,
    'Administrador',
    'SST Master',
    '2023-01-01',
    'Bogotá D.C.',
    '1988-05-15',
    'Bogotá D.C.',
    'Dirección General de Seguridad SST',
    '3100000000',
    'admin@prevenapp.app',
    'Supervisión y Control General del Sistema SST',
    'Superusuario Administrador de PrevenApp con acceso total.',
    'admin'
  )
  on conflict (id) do update set
    cedula = excluded.cedula,
    nombres = excluded.nombres,
    apellidos = excluded.apellidos,
    role = 'admin',
    obs = excluded.obs;
end $$;
