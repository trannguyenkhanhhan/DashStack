const ProductBanner = () => {
    return (
        <div className="relative banner-bg text-white bg-[#4D4DFF] py-8 px-20 rounded-lg shadow-lg mb-8 overflow-hidden h-110 group">
        <div className="relative z-10">
            <p className="text-sm font-medium mb-2">September 12-22</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Enjoy free home</h2>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">delivery in this summer</h2>
            <p className="text-base mb-6 opacity-90 max-w-md">Designer Dresses - Pick from trendy Designer Dress.</p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-md transition duration-200">
                Get Started
            </button>
        </div>
            <button className="absolute  opacity-0 group-hover:opacity-100 left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 rounded-full p-2 text-white focus:outline-none transition duration-200">
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button className="absolute opacity-0 group-hover:opacity-100 right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 rounded-full p-2 text-white focus:outline-none transition duration-200">
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
            </button>
    </div>
    );
  };
  
  export default ProductBanner;
  
