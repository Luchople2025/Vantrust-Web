import Image from 'next/image';

/*este es el fondo de pantalla de burbujas*/

const AnimatedBackground = () => {
    return (
        <div className="absolute inset-0 -z-10 w-full h-full">
            <Image 
                src="/Animated Shape.svg" 
                alt="Background" 
                layout="fill" 
                objectFit="cover" 
                priority 
            />
        </div>
    );
};

export default AnimatedBackground;
