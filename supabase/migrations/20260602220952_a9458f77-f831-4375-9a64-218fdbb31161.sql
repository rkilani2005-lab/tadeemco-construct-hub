revoke execute on function public.has_role(uuid, public.app_role) from public, anon;
revoke execute on function public.is_cms_admin() from public, anon;
grant execute on function public.has_role(uuid, public.app_role) to authenticated;
grant execute on function public.is_cms_admin() to authenticated;