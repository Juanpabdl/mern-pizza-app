import download from '../assets/download.png';
import app from '../assets/app.png';

const HomePage = () => {
    return(
        <div className="flex flex-col gap-12 items-center mx-auto">   
            <div className="bg-white rounded-lg shadow-md py-8 px-6 flex flex-col text-center gap-5 -mt-16">
                <h1 className="text-5xl font-bold tracking-tight text-orange-600">
                    Tuck on some takeaway today!
                </h1>
                <span className="text-xl">Your food is just a click away</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-4 md:p-3">
                <img src={app} alt="App img" className='max-w-[400px] mx-auto'/>
                <div className="flex flex-col items-center justify-center gap-4 text-center">
                    <span className="font-bold text-3xl tracking-tighter">
                        Order our delicious pizzas even faster today!
                    </span>
                    <span className="text-lg">
                        Download the Mozzirella mobile app for easy ordering and personalized deals.
                    </span>
                    <img src={download} alt="App store image"
                    className='max-w-[300px] mx-auto'/>
                </div>
            </div>
        </div>
    )
}
export default HomePage;