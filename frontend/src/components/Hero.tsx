import hero from '../assets/hero.png';

const Hero = () => {
    return (
        <section>
            <img src={hero} alt='Hero Image' className='w-full max-h-[600px] object-cover'/>
        </section>
    );
}

export default Hero;