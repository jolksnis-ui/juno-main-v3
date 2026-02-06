/** Force dynamic rendering so /login is not statically prerendered (avoids useSearchParams prerender error) */
export const dynamic = 'force-dynamic';

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
