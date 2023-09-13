
import * as React from 'react';


export default function RepresentacaoCaminhaoPequena(props) {

    const car_images = props.car_images;
    const opacity_standard = 0;

  return (
    <div style={{position: 'relative', margin: '0 auto', width: 300}}>
    <img src='/truck.png' width={300} style={{position: 'absolute', top: 57, left: 0}} />

    <div style={{ position: 'absolute', top: 58, left: 41 }}>
      <img src={car_images[1]} width={50} style={{ transform: 'rotate(10deg)', opacity: car_images[1] === 'car.png' || car_images[1] === "car_disabled.png" ? opacity_standard : 1 }} />
      <span style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', background: 'rgba(0, 0, 0, 0.5)', color: 'white', padding: '0px 3px' }}>1</span>
    </div>

    <div style={{ position: 'absolute', top: 62, left: 90 }}>
      <img src={car_images[2]} width={52.5} style={{ transform: 'scaleX(-1)', opacity: car_images[2] === 'car.png' || car_images[2] === "car_disabled.png" ? opacity_standard : 1 }} />
      <span style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', background: 'rgba(0, 0, 0, 0.5)', color: 'white', padding: '0px 3px' }}>2</span>
    </div>

    <div style={{ position: 'absolute', top: 62, left: 140 }}>
      <img src={car_images[3]} width={50} style={{ transform: 'rotate(1deg)', opacity: car_images[3] === 'car.png' || car_images[3] === "car_disabled.png" ? opacity_standard : 1 }} />
      <span style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', background: 'rgba(0, 0, 0, 0.5)', color: 'white', padding: '0px 3px' }}>3</span>
    </div>

    <div style={{ position: 'absolute', top: 58, left: 190 }}>
      <img src={car_images[4]} width={60} style={{ transform: 'rotate(0deg)', opacity: car_images[4] === 'car.png' || car_images[4] === "car_disabled.png" ? opacity_standard : 1 }} />
      <span style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', background: 'rgba(0, 0, 0, 0.5)', color: 'white', padding: '0px 3px' }}>4</span>
    </div>

    <div style={{ position: 'absolute', top: 65, left: 249 }}>
      <img src={car_images[5]} width={55} style={{ transform: 'rotate(7deg)', opacity: car_images[5] === 'car.png' || car_images[5] === "car_disabled.png" ? opacity_standard : 1 }} />
      <span style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', background: 'rgba(0, 0, 0, 0.5)', color: 'white', padding: '0px 3px' }}>5</span>
    </div>

    <div style={{ position: 'absolute', top: 91, left: 65 }}>
      <img src={car_images[6]} width={56.5} style={{ transform: 'rotate(2deg)', opacity: car_images[6] === 'car.png' || car_images[6] === "car_disabled.png" ? opacity_standard : 1 }} />
      <span style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', background: 'rgba(0, 0, 0, 0.5)', color: 'white', padding: '0px 3px' }}>6</span>
    </div>

    <div style={{ position: 'absolute', top: 85, left: 119 }}>
      <img src={car_images[8]} width={55} style={{ transform: 'rotate(9deg)', opacity: car_images[8] === 'car.png' || car_images[8] === "car_disabled.png" ? opacity_standard : 1 }} />
      <span style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', background: 'rgba(0, 0, 0, 0.5)', color: 'white', padding: '0px 3px' }}>8</span>
    </div>

    <div style={{ position: 'absolute', top: 85, left: 180 }}>
      <img src={car_images[10]} width={55} style={{ transform: 'rotate(5deg)', opacity: car_images[10] === 'car.png' || car_images[10] === "car_disabled.png" ? opacity_standard : 1 }} />
      <span style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', background: 'rgba(0, 0, 0, 0.5)', color: 'white', padding: '0px 3px' }}>10</span>
    </div>

    <div style={{ position: 'absolute', top: 95, left: 238 }}>
      <img src={car_images[11]} width={60} style={{ transform: 'rotate(5deg)', opacity: car_images[11] === 'car.png' || car_images[11] === "car_disabled.png" ? opacity_standard : 1 }} />
      <span style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', background: 'rgba(0, 0, 0, 0.5)', color: 'white', padding: '0px 3px' }}>11</span>
    </div>

    <div style={{ position: 'absolute', top: 110, left: 114 }}>
      <img src={car_images[7]} width={50} style={{ transform: 'scaleX(-1)', opacity: car_images[7] === 'car.png' || car_images[7] === "car_disabled.png" ? opacity_standard : 1 }} />
      <span style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', background: 'rgba(0, 0, 0, 0.5)', color: 'white', padding: '0px 3px' }}>7</span>
    </div>

    <div style={{ position: 'absolute', top: 109, left: 162 }}>
      <img src={car_images[9]} width={55} style={{ transform: 'scaleX(-1)', opacity: car_images[9] === 'car.png' || car_images[9] === "car_disabled.png" ? opacity_standard : 1 }} />
      <span style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', background: 'rgba(0, 0, 0, 0.5)', color: 'white', padding: '0px 3px' }}>9</span>
    </div>

    </div>
  );
}