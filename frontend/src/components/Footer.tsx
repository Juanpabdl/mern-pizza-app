const Footer = () => {
    return(
        <footer className="w-full bg-orange-500 text-white text-center">
            <div className="flex mx-auto justify-between items-center p-6">
                <p className="text-3xl font-bold tracking-tight">
                    Mozzirella's Pizza
                </p>
                <p>&copy; 2024 My Company. All rights reserved.</p>
                <div className="flex gap-3 text-lg">
                    <p>Terms of service</p>
                    <p>Privacy Policy</p>
                </div>
            </div>
        </footer>
    )
}
export default Footer;