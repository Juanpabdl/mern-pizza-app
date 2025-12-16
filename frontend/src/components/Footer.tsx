const Footer = () => {
    return(
        <footer className="w-full bg-orange-500 text-white text-center">
            <div className="flex flex-col md:flex-row mx-auto gap-4 justify-between items-center py-10 px-4">
                <p className="text-3xl font-bold tracking-tight">
                    Mozzirella's Pizza
                </p>
                <p className="text-white/50">&copy; 2025 My Company. All rights reserved.</p>
                <div className="flex flex-col md:flex-row gap-3 text-lg tracking-tight">
                    <p>Terms of service</p>
                    <p>Privacy Policy</p>
                </div>
            </div>
        </footer>
    )
}
export default Footer;