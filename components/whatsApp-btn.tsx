"use client"

export const WhatsAppButton = () => {

  const phoneNumber = '51949600685';
  const message = 'Hola, quiero más información';

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className='w-full absolute h-32'>
      <div className='fixed bottom-7 right-7 z-50 flex justify-end bg-white rounded-full'>
        <button className="p-0.5 rounded-md" onClick={handleClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-14 w-14"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
            aria-hidden="true"
          >
            <path
              fill="green"
              d="M12 0C5.372 0 0 5.372 0 12c0 2.122.551 4.142 1.596 5.949l-1.633 5.997 6.118-1.607A11.927 11.927 0 0 0 12 24c6.628 0 12-5.372 12-12S18.628 0 12 0zm6.206 17.449c-.256.722-1.284 1.33-2.09 1.507-.557.119-1.28.209-3.711-.792-3.144-1.28-5.144-4.445-5.298-4.66-.151-.214-1.26-1.68-1.26-3.204 0-1.524.835-2.275 1.13-2.58.293-.305.651-.381.869-.381.214 0 .428.004.616.011.199.01.463-.074.729.551.256.62.872 2.141.949 2.298.076.152.127.336.024.55-.1.212-.151.336-.293.504-.151.175-.32.383-.457.512-.152.146-.312.308-.136.605.175.293.779 1.28 1.674 2.074 1.151 1.022 2.111 1.335 2.41 1.481.293.147.467.123.643-.075.177-.197.739-.861.938-1.155.199-.293.393-.238.665-.145.271.092 1.722.812 2.017.961.293.147.488.218.561.336.074.119.074.68-.182 1.401z"
            />
          </svg>
        </button>
      </div>

    </div>
  )
}
