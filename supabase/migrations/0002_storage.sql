-- ===========================================================================
-- Citizen MVP — storage bucket for report media (photos/videos).
-- ===========================================================================

-- Public bucket so report photos render on the public map. Uploads are still
-- restricted to authenticated users by the policies below.
insert into storage.buckets (id, name, public)
values ('report-media', 'report-media', true)
on conflict (id) do nothing;

-- Anyone can read objects in this bucket (they are public report media).
create policy "report_media_public_read" on storage.objects
  for select using (bucket_id = 'report-media');

-- Authenticated users may upload into the bucket.
create policy "report_media_authenticated_insert" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'report-media');

-- Users may update/delete only the objects they own.
create policy "report_media_owner_update" on storage.objects
  for update to authenticated
  using (bucket_id = 'report-media' and owner = auth.uid());

create policy "report_media_owner_delete" on storage.objects
  for delete to authenticated
  using (bucket_id = 'report-media' and owner = auth.uid());
