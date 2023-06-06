
import * as React from 'react';


export default function RepresentacaoCaminhaoGrande(props) {

    const car_images = props.car_images;
    const opacity_standard = 0.5;

  return (
    <div style={{position: 'relative', margin: '0 auto', width: 600}}>
    <img src='/truck.png' width={600} style={{position: 'absolute', top: 40, left: 0}} />
  
    <div style={{ position: 'absolute', top: 40, left: 25 }}>
      <img src={car_images[10]} width={100} style={{ transform: 'rotate(5deg)', opacity: car_images[10] === 'car.png' ? opacity_standard : 1 }} />
      <span style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', background: 'rgba(0, 0, 0, 0.5)', color: 'white', padding: '4px 8px' }}>1</span>
    </div>

    <div style={{ position: 'absolute', top: 42, left: 129 }}>
      <img src={car_images[11]} width={105} style={{ transform: 'scaleX(-1)', opacity: car_images[11] === 'car.png' ? opacity_standard : 1 }} />
      <span style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', background: 'rgba(0, 0, 0, 0.5)', color: 'white', padding: '4px 8px' }}>2</span>
    </div>

    <div style={{ position: 'absolute', top: 35, left: 249 }}>
      <img src={car_images[1]} width={100} style={{ transform: 'rotate(6deg)', opacity: car_images[1] === 'car.png' ? opacity_standard : 1 }} />
      <span style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', background: 'rgba(0, 0, 0, 0.5)', color: 'white', padding: '4px 8px' }}>3</span>
    </div>

    <div style={{ position: 'absolute', top: 30, left: 360 }}>
      <img src={car_images[2]} width={100} style={{ transform: 'scaleX(-1) rotate(2deg)', opacity: car_images[2] === 'car.png' ? opacity_standard : 1 }} />
      <span style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', background: 'rgba(0, 0, 0, 0.5)', color: 'white', padding: '4px 8px' }}>4</span>
    </div>

    <div style={{ position: 'absolute', top: 37, left: 490 }}>
      <img src={car_images[3]} width={110} style={{ transform: 'rotate(7deg)', opacity: car_images[3] === 'car.png' ? opacity_standard : 1 }} />
      <span style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', background: 'rgba(0, 0, 0, 0.5)', color: 'white', padding: '4px 8px' }}>5</span>
    </div>

    <div style={{ position: 'absolute', top: 90, left: 79 }}>
      <img src={car_images[4]} width={113} style={{ transform: 'rotate(2deg)', opacity: car_images[4] === 'car.png' ? opacity_standard : 1 }} />
      <span style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', background: 'rgba(0, 0, 0, 0.5)', color: 'white', padding: '4px 8px' }}>6</span>
    </div>

    <div style={{ position: 'absolute', top: 80, left: 220 }}>
      <img src={car_images[5]} width={110} style={{ transform: 'rotate(9deg)', opacity: car_images[5] === 'car.png' ? opacity_standard : 1 }} />
      <span style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', background: 'rgba(0, 0, 0, 0.5)', color: 'white', padding: '4px 8px' }}>8</span>
    </div>

    <div style={{ position: 'absolute', top: 75, left: 355 }}>
      <img src={car_images[7]} width={110} style={{ transform: 'rotate(9deg)', opacity: car_images[7] === 'car.png' ? opacity_standard : 1 }} />
      <span style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', background: 'rgba(0, 0, 0, 0.5)', color: 'white', padding: '4px 8px' }}>10</span>
    </div>

    <div style={{ position: 'absolute', top: 85, left: 470 }}>
      <img src={car_images[9]} width={120} style={{ transform: 'rotate(5deg)', opacity: car_images[9] === 'car.png' ? opacity_standard : 1 }} />
      <span style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', background: 'rgba(0, 0, 0, 0.5)', color: 'white', padding: '4px 8px' }}>11</span>
    </div>

    <div style={{ position: 'absolute', top: 120, left: 195 }}>
      <img src={car_images[6]} width={120} style={{ transform: 'scaleX(-1)', opacity: car_images[6] === 'car.png' ? opacity_standard : 1 }} />
      <span style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', background: 'rgba(0, 0, 0, 0.5)', color: 'white', padding: '4px 8px' }}>7</span>
    </div>

    <div style={{ position: 'absolute', top: 115, left: 325 }}>
      <img src={car_images[8]} width={120} style={{ transform: 'scaleX(-1)', opacity: car_images[8] === 'car.png' ? opacity_standard : 1 }} />
      <span style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', background: 'rgba(0, 0, 0, 0.5)', color: 'white', padding: '4px 8px' }}>9</span>
    </div>

    </div>
  );
}