import Image from 'next/image';

const Footer = () => {
    return (
        <footer className="bg-[#2D4F3F] text-white py-12 px-6">
            <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
                
                
                <h2 className="text-4xl md:text-5xl font-bold mb-4">KeenKeeper</h2>
                
               
                <p className="text-slate-300 max-w-2xl mb-8 text-sm md:text-base leading-relaxed">
                    Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
                </p>

                
                <div className="mb-12">
                    <p className="text-sm font-medium mb-4 uppercase tracking-widest text-slate-200">Social Links</p>
                    <div className="flex justify-center gap-4">
                      
                        <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-slate-200 transition-colors">
                            <Image src="/instagram.png" alt="Instagram" width={30} height={30} />
                        </a>
                       
                        <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-slate-200 transition-colors">
                            <Image src="/facebook.png" alt="Facebook" width={30} height={30} />
                        </a>
                      
                        <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-slate-200 transition-colors">
                            <Image src="/twitter.png" alt="X" width={30} height={30} />
                        </a>
                    </div>
                </div>

               
                <div className="w-full border-t border-slate-600/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
                    <p>© 2026 KeenKeeper. All rights reserved.</p>
                    
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-white transition-colors">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;