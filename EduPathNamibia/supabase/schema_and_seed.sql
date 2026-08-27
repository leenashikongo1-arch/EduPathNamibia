-- EduPath Namibia Supabase Schema & Seed Data

create table if not exists universities (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text check (type in ('Local', 'International')) not null,
  country text not null,
  logo_url text
);

create table if not exists courses (
  id uuid primary key default gen_random_uuid(),
  university_id uuid references universities(id) on delete cascade,
  course_name text not null,
  field_of_study text not null,
  minimum_points integer not null,
  employment_rate decimal(5,2) not null,
  duration_years integer not null
);

create table if not exists prerequisites (
  id uuid primary key default gen_random_uuid(),
  course_id uuid references courses(id) on delete cascade,
  subject_name text not null,
  minimum_level text check (minimum_level in ('NSSCO', 'NSSCAS')) not null,
  minimum_grade text not null
);

create table if not exists point_scale (
  id uuid primary key default gen_random_uuid(),
  level text check (level in ('NSSCO', 'NSSCAS')) not null,
  grade text not null,
  points integer not null
);

-- Enable Row Level Security (RLS)
alter table universities enable row level security;
alter table courses enable row level security;
alter table prerequisites enable row level security;
alter table point_scale enable row level security;

create policy "Allow public read access on universities" on universities for select using (true);
create policy "Allow public read access on courses" on courses for select using (true);
create policy "Allow public read access on prerequisites" on prerequisites for select using (true);
create policy "Allow public read access on point_scale" on point_scale for select using (true);

-- Seed Data
insert into point_scale (level, grade, points) values
('NSSCO', 'A*', 8),
('NSSCO', 'A', 7),
('NSSCO', 'B', 6),
('NSSCO', 'C', 5),
('NSSCO', 'D', 4),
('NSSCO', 'E', 3),
('NSSCO', 'F', 2),
('NSSCO', 'G', 1),
('NSSCAS', 'a', 9),
('NSSCAS', 'b', 8),
('NSSCAS', 'c', 7),
('NSSCAS', 'd', 6),
('NSSCAS', 'e', 5);

-- Insert Universities
insert into universities (id, name, type, country, logo_url) values
('11111111-1111-1111-1111-111111111111', 'University of Namibia (UNAM)', 'Local', 'Namibia', 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=100&h=100&fit=crop'),
('22222222-2222-2222-2222-222222222222', 'Namibia University of Science and Technology (NUST)', 'Local', 'Namibia', 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=100&h=100&fit=crop'),
('33333333-3333-3333-3333-333333333333', 'International University of Management (IUM)', 'Local', 'Namibia', 'https://images.unsplash.com/photo-1562774053-701939374585?w=100&h=100&fit=crop'),
('44444444-4444-4444-4444-444444444444', 'University of Cape Town (UCT)', 'International', 'South Africa', 'https://images.unsplash.com/photo-14982436915f1-85584852028e?w=100&h=100&fit=crop');

-- Insert Courses
insert into courses (id, university_id, course_name, field_of_study, minimum_points, employment_rate, duration_years) values
('c1111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', 'BSc Cybersecurity', 'IT', 25, 88.00, 4),
('c2222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 'Bachelor of Education', 'Education', 22, 65.00, 4),
('c3333333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111', 'B.Eng Mining Engineering', 'Engineering', 30, 92.00, 4),
('c4444444-4444-4444-4444-444444444444', '33333333-3333-3333-3333-333333333333', 'Bachelor of Nursing', 'Health Sciences', 24, 80.00, 4);

-- Insert Prerequisites
insert into prerequisites (course_id, subject_name, minimum_level, minimum_grade) values
('c1111111-1111-1111-1111-111111111111', 'Mathematics', 'NSSCO', 'C'),
('c1111111-1111-1111-1111-111111111111', 'English Language', 'NSSCO', 'C'),
('c2222222-2222-2222-2222-222222222222', 'English Language', 'NSSCO', 'D'),
('c3333333-3333-3333-3333-333333333333', 'Mathematics', 'NSSCAS', 'c'),
('c3333333-3333-3333-3333-333333333333', 'Physical Science', 'NSSCAS', 'c'),
('c4444444-4444-4444-4444-444444444444', 'Biology', 'NSSCO', 'C'),
('c4444444-4444-4444-4444-444444444444', 'English Language', 'NSSCO', 'C');
