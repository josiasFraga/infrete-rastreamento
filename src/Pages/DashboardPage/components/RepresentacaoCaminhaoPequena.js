
import * as React from 'react';


export default function RepresentacaoCaminhaoPequena(props) {

    const car_images = props.car_images;
    const opacity_standard = 0.5;

  return (
    <div style={{position: 'relative', margin: '0 auto', width: 300}}>
    <img src='/truck.png' width={300} style={{position: 'absolute', top: 65, left: 0}} />

    <div style={{ position: 'absolute', top: 67, left: 9 }}>
      <img src={car_images[10]} width={50} style={{ transform: 'rotate(5deg)', opacity: car_images[10] === 'car.png' ? opacity_standard : 1 }} />
      <span style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', background: 'rgba(0, 0, 0, 0.5)', color: 'white', padding: '0px 3px' }}>1</span>
    </div>

    <div style={{ position: 'absolute', top: 65, left: 65 }}>
      <img src={car_images[11]} width={52.5} style={{ transform: 'scaleX(-1)', opacity: car_images[11] === 'car.png' ? opacity_standard : 1 }} />
      <span style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', background: 'rgba(0, 0, 0, 0.5)', color: 'white', padding: '0px 3px' }}>2</span>
    </div>

    <div style={{ position: 'absolute', top: 62, left: 123 }}>
      <img src={car_images[1]} width={50} style={{ transform: 'rotate(6deg)', opacity: car_images[1] === 'car.png' ? opacity_standard : 1 }} />
      <span style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', background: 'rgba(0, 0, 0, 0.5)', color: 'white', padding: '0px 3px' }}>3</span>
    </div>

    <div style={{ position: 'absolute', top: 60, left: 180 }}>
      <img src={car_images[2]} width={60} style={{ transform: 'scaleX(-1) rotate(2deg)', opacity: car_images[2] === 'car.png' ? opacity_standard : 1 }} />
      <span style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', background: 'rgba(0, 0, 0, 0.5)', color: 'white', padding: '0px 3px' }}>4</span>
    </div>

    <div style={{ position: 'absolute', top: 65, left: 246 }}>
      <img src={car_images[3]} width={55} style={{ transform: 'rotate(7deg)', opacity: car_images[3] === 'car.png' ? opacity_standard : 1 }} />
      <span style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', background: 'rgba(0, 0, 0, 0.5)', color: 'white', padding: '0px 3px' }}>5</span>
    </div>

    <div style={{ position: 'absolute', top: 90, left: 38 }}>
      <img src={car_images[4]} width={56.5} style={{ transform: 'rotate(2deg)', opacity: car_images[4] === 'car.png' ? opacity_standard : 1 }} />
      <span style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', background: 'rgba(0, 0, 0, 0.5)', color: 'white', padding: '0px 3px' }}>6</span>
    </div>

    <div style={{ position: 'absolute', top: 85, left: 97 }}>
      <img src={car_images[5]} width={55} style={{ transform: 'rotate(9deg)', opacity: car_images[5] === 'car.png' ? opacity_standard : 1 }} />
      <span style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', background: 'rgba(0, 0, 0, 0.5)', color: 'white', padding: '0px 3px' }}>8</span>
    </div>

    <div style={{ position: 'absolute', top: 82, left: 178 }}>
      <img src={car_images[7]} width={55} style={{ transform: 'rotate(9deg)', opacity: car_images[7] === 'car.png' ? opacity_standard : 1 }} />
      <span style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', background: 'rgba(0, 0, 0, 0.5)', color: 'white', padding: '0px 3px' }}>10</span>
    </div>

    <div style={{ position: 'absolute', top: 87, left: 236 }}>
      <img src={car_images[9]} width={60} style={{ transform: 'rotate(5deg)', opacity: car_images[9] === 'car.png' ? opacity_standard : 1 }} />
      <span style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', background: 'rgba(0, 0, 0, 0.5)', color: 'white', padding: '0px 3px' }}>11</span>
    </div>

    <div style={{ position: 'absolute', top: 104, left: 99 }}>
      <img src={car_images[6]} width={50} style={{ transform: 'scaleX(-1)', opacity: car_images[6] === 'car.png' ? opacity_standard : 1 }} />
      <span style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', background: 'rgba(0, 0, 0, 0.5)', color: 'white', padding: '0px 3px' }}>7</span>
    </div>

    <div style={{ position: 'absolute', top: 102, left: 162 }}>
      <img src={car_images[8]} width={55} style={{ transform: 'scaleX(-1)', opacity: car_images[8] === 'car.png' ? opacity_standard : 1 }} />
      <span style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', background: 'rgba(0, 0, 0, 0.5)', color: 'white', padding: '0px 3px' }}>9</span>
    </div>

    </div>
  );
}