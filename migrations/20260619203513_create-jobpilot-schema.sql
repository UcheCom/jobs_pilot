CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  location TEXT,
  current_title TEXT,
  experience_level TEXT CHECK (
    experience_level IS NULL OR experience_level IN ('junior', 'mid', 'senior', 'lead')
  ),
  years_experience INTEGER CHECK (
    years_experience IS NULL OR years_experience >= 0
  ),
  skills TEXT[] NOT NULL DEFAULT '{}',
  industries TEXT[] NOT NULL DEFAULT '{}',
  work_experience JSONB NOT NULL DEFAULT '[]'::JSONB CHECK (
    jsonb_typeof(work_experience) = 'array'
    AND jsonb_array_length(work_experience) <= 3
  ),
  education JSONB NOT NULL DEFAULT '{}'::JSONB CHECK (
    jsonb_typeof(education) = 'object'
  ),
  job_titles_seeking TEXT[] NOT NULL DEFAULT '{}',
  remote_preference TEXT CHECK (
    remote_preference IS NULL OR remote_preference IN ('remote', 'onsite', 'hybrid', 'any')
  ),
  preferred_locations TEXT[] NOT NULL DEFAULT '{}',
  salary_expectation TEXT,
  cover_letter_tone TEXT CHECK (
    cover_letter_tone IS NULL OR cover_letter_tone IN ('formal', 'casual', 'enthusiastic')
  ),
  linkedin_url TEXT,
  portfolio_url TEXT,
  work_authorization TEXT CHECK (
    work_authorization IS NULL
    OR work_authorization IN ('citizen', 'permanent_resident', 'visa_required')
  ),
  resume_pdf_url TEXT,
  resume_pdf_key TEXT,
  is_complete BOOLEAN NOT NULL DEFAULT FALSE,
  completion_percentage INTEGER NOT NULL DEFAULT 0 CHECK (
    completion_percentage BETWEEN 0 AND 100
  ),
  missing_fields TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.agent_runs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'running' CHECK (
    status IN ('running', 'completed', 'failed')
  ),
  job_title_searched TEXT NOT NULL,
  location_searched TEXT,
  jobs_found INTEGER NOT NULL DEFAULT 0 CHECK (jobs_found >= 0),
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  UNIQUE (id, user_id),
  CHECK (completed_at IS NULL OR completed_at >= started_at)
);

CREATE TABLE public.jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  run_id UUID,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  source TEXT NOT NULL CHECK (source IN ('search', 'url')),
  source_url TEXT NOT NULL,
  external_apply_url TEXT,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT,
  salary TEXT,
  job_type TEXT CHECK (
    job_type IS NULL OR job_type IN ('fulltime', 'parttime', 'contract')
  ),
  about_role TEXT,
  responsibilities TEXT[] NOT NULL DEFAULT '{}',
  requirements TEXT[] NOT NULL DEFAULT '{}',
  nice_to_have TEXT[] NOT NULL DEFAULT '{}',
  benefits TEXT[] NOT NULL DEFAULT '{}',
  about_company TEXT,
  match_score INTEGER NOT NULL CHECK (match_score BETWEEN 0 AND 100),
  match_reason TEXT NOT NULL,
  matched_skills TEXT[] NOT NULL DEFAULT '{}',
  missing_skills TEXT[] NOT NULL DEFAULT '{}',
  company_research JSONB CHECK (
    company_research IS NULL OR jsonb_typeof(company_research) = 'object'
  ),
  found_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (id, user_id),
  FOREIGN KEY (run_id, user_id)
    REFERENCES public.agent_runs(id, user_id) ON DELETE CASCADE
);

CREATE TABLE public.agent_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  run_id UUID NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  message TEXT NOT NULL CHECK (length(btrim(message)) > 0),
  level TEXT NOT NULL DEFAULT 'info' CHECK (
    level IN ('info', 'success', 'warning', 'error')
  ),
  job_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  FOREIGN KEY (run_id, user_id)
    REFERENCES public.agent_runs(id, user_id) ON DELETE CASCADE,
  FOREIGN KEY (job_id, user_id)
    REFERENCES public.jobs(id, user_id) ON DELETE CASCADE
);

CREATE INDEX agent_runs_user_started_idx
  ON public.agent_runs (user_id, started_at DESC);
CREATE INDEX agent_runs_user_status_idx
  ON public.agent_runs (user_id, status);
CREATE INDEX jobs_run_id_idx ON public.jobs (run_id);
CREATE INDEX jobs_user_found_idx ON public.jobs (user_id, found_at DESC);
CREATE INDEX jobs_user_match_idx ON public.jobs (user_id, match_score DESC);
CREATE INDEX agent_logs_run_created_idx
  ON public.agent_logs (run_id, created_at DESC);
CREATE INDEX agent_logs_user_created_idx
  ON public.agent_logs (user_id, created_at DESC);
CREATE INDEX agent_logs_job_id_idx ON public.agent_logs (job_id);

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = pg_catalog, public, pg_temp
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER profiles_set_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY profiles_owner_select ON public.profiles
  FOR SELECT TO authenticated
  USING (id = (SELECT auth.uid()));
CREATE POLICY profiles_owner_insert ON public.profiles
  FOR INSERT TO authenticated
  WITH CHECK (id = (SELECT auth.uid()));
CREATE POLICY profiles_owner_update ON public.profiles
  FOR UPDATE TO authenticated
  USING (id = (SELECT auth.uid()))
  WITH CHECK (id = (SELECT auth.uid()));

CREATE POLICY agent_runs_owner_select ON public.agent_runs
  FOR SELECT TO authenticated
  USING (user_id = (SELECT auth.uid()));
CREATE POLICY agent_runs_owner_insert ON public.agent_runs
  FOR INSERT TO authenticated
  WITH CHECK (user_id = (SELECT auth.uid()));
CREATE POLICY agent_runs_owner_update ON public.agent_runs
  FOR UPDATE TO authenticated
  USING (user_id = (SELECT auth.uid()))
  WITH CHECK (user_id = (SELECT auth.uid()));

CREATE POLICY jobs_owner_select ON public.jobs
  FOR SELECT TO authenticated
  USING (user_id = (SELECT auth.uid()));
CREATE POLICY jobs_owner_insert ON public.jobs
  FOR INSERT TO authenticated
  WITH CHECK (user_id = (SELECT auth.uid()));
CREATE POLICY jobs_owner_update ON public.jobs
  FOR UPDATE TO authenticated
  USING (user_id = (SELECT auth.uid()))
  WITH CHECK (user_id = (SELECT auth.uid()));

CREATE POLICY agent_logs_owner_select ON public.agent_logs
  FOR SELECT TO authenticated
  USING (user_id = (SELECT auth.uid()));
CREATE POLICY agent_logs_owner_insert ON public.agent_logs
  FOR INSERT TO authenticated
  WITH CHECK (user_id = (SELECT auth.uid()));

GRANT USAGE ON SCHEMA public TO authenticated;

REVOKE ALL ON public.profiles FROM anon, authenticated;
REVOKE ALL ON public.agent_runs FROM anon, authenticated;
REVOKE ALL ON public.jobs FROM anon, authenticated;
REVOKE ALL ON public.agent_logs FROM anon, authenticated;

GRANT SELECT, INSERT ON public.profiles TO authenticated;
GRANT UPDATE (
  full_name,
  email,
  phone,
  location,
  current_title,
  experience_level,
  years_experience,
  skills,
  industries,
  work_experience,
  education,
  job_titles_seeking,
  remote_preference,
  preferred_locations,
  salary_expectation,
  cover_letter_tone,
  linkedin_url,
  portfolio_url,
  work_authorization,
  resume_pdf_url,
  resume_pdf_key,
  is_complete,
  completion_percentage,
  missing_fields
) ON public.profiles TO authenticated;

GRANT SELECT, INSERT ON public.agent_runs TO authenticated;
GRANT UPDATE (status, jobs_found, completed_at)
  ON public.agent_runs TO authenticated;

GRANT SELECT, INSERT ON public.jobs TO authenticated;
GRANT UPDATE (
  external_apply_url,
  title,
  company,
  location,
  salary,
  job_type,
  about_role,
  responsibilities,
  requirements,
  nice_to_have,
  benefits,
  about_company,
  match_score,
  match_reason,
  matched_skills,
  missing_skills,
  company_research
) ON public.jobs TO authenticated;

GRANT SELECT, INSERT ON public.agent_logs TO authenticated;

ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

CREATE POLICY resumes_owner_select ON storage.objects
  FOR SELECT TO authenticated
  USING (
    bucket = 'resumes'
    AND uploaded_by = (SELECT auth.jwt() ->> 'sub')
    AND (storage.foldername(key))[1] = (SELECT auth.jwt() ->> 'sub')
  );
CREATE POLICY resumes_owner_insert ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (
    bucket = 'resumes'
    AND uploaded_by = (SELECT auth.jwt() ->> 'sub')
    AND (storage.foldername(key))[1] = (SELECT auth.jwt() ->> 'sub')
  );
CREATE POLICY resumes_owner_update ON storage.objects
  FOR UPDATE TO authenticated
  USING (
    bucket = 'resumes'
    AND uploaded_by = (SELECT auth.jwt() ->> 'sub')
    AND (storage.foldername(key))[1] = (SELECT auth.jwt() ->> 'sub')
  )
  WITH CHECK (
    bucket = 'resumes'
    AND uploaded_by = (SELECT auth.jwt() ->> 'sub')
    AND (storage.foldername(key))[1] = (SELECT auth.jwt() ->> 'sub')
  );
CREATE POLICY resumes_owner_delete ON storage.objects
  FOR DELETE TO authenticated
  USING (
    bucket = 'resumes'
    AND uploaded_by = (SELECT auth.jwt() ->> 'sub')
    AND (storage.foldername(key))[1] = (SELECT auth.jwt() ->> 'sub')
  );

GRANT USAGE ON SCHEMA storage TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON storage.objects TO authenticated;
