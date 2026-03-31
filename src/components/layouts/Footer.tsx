const footerLinks = {
  Produk: ["Fitur", "Harga", "Integrasi", "Changelog"],
  Sumber: ["Dokumentasi", "Blog", "Pusat Bantuan", "Status"],
  Perusahaan: ["Tentang", "Karir", "Pers", "Kontak"],
  Legal: ["Privasi", "Ketentuan", "Kebijakan Cookie"],
};

const Footer = () => {
  return (
    <footer className="border-t border-border py-16">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          <div className="col-span-2 md:col-span-1">
            <span className="font-heading text-xl font-bold text-foreground">Durent</span>
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
              Platform sewa untuk kreator modern. Kru, peralatan, lokasi — disederhanakan.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-foreground mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between mt-16 pt-8 border-t border-border gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Durent. Hak cipta dilindungi.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Twitter</a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">LinkedIn</a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
