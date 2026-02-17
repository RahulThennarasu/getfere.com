import fereLogo from "figma:asset/57f01bd1a49ce813d16dd06af7b16e2bd18ea4b6.png";

export function Footer() {
  return (
    <footer className="py-16 px-6 mt-96">
      <div className="max-w-6xl mx-auto">
        <div className="border-t border-black/10 mb-12"></div>
        
        <div className="mb-12">
          <img 
            src={fereLogo} 
            alt="fere logo" 
            className="mb-4 w-12 h-12"
          />
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-black/40">© 2026 fere. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}