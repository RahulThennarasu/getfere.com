export function Navigation() {
  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-50 px-3"
      style={{
        paddingTop: '0.5rem',
        paddingBottom: '0.5rem',
        background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.2) 40%, rgba(255, 255, 255, 0) 100%)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-start">
        <div 
          className="text-black"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '55px',
            fontWeight: 500,
            letterSpacing: '-0.02em',
          }}
        >
          fere
        </div>
      </div>
    </nav>
  );
}