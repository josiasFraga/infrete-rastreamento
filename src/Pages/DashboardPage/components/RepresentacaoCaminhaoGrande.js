
import * as React from 'react';


export default function RepresentacaoCaminhaoGrande(props) {

    const car_images = props.car_images;
    const opacity_standard = 0.5;

  return (
    <div style={{position: 'relative', margin: '0 auto', width: 600}}>
    <img src='/truck.png' width={600} style={{position: 'absolute', top: 40, left: 0}} />
    <img src={car_images[10]} width={100} style={{
      position: 'absolute', 
      top: 40, 
      left: 25,
      transform: 'rotate(5deg)',
      opacity: car_images[10] == 'car.png' ? opacity_standard : 1
    }} />
    <img src={car_images[11]} width={105} style={{
      position: 'absolute', 
      top: 42, 
      left: 129, 
      transform: 'scaleX(-1)',
      opacity: car_images[11] == 'car.png' ? opacity_standard : 1
    }} />
    <img src={car_images[1]} width={100} style={{
      position: 'absolute', 
      top: 35, 
      left: 249,
      transform: 'rotate(6deg)',
      opacity: car_images[1] == 'car.png' ? opacity_standard : 1
    }} />
    <img src={car_images[2]} width={120} style={{
      position: 'absolute', 
      top: 30, 
      left: 360, 
      transform: 'scaleX(-1) rotate(2deg)',
      opacity: car_images[2] == 'car.png' ? opacity_standard : 1
    }} />
    <img src={car_images[3]} width={110} style={{
      position: 'absolute', 
      top: 37, 
      left: 490,
      transform: 'rotate(7deg)',
      opacity: car_images[3] == 'car.png' ? opacity_standard : 1
    }} />
    <img src={car_images[4]} width={113} style={{
      position: 'absolute', 
      top: 90, 
      left: 79,
      transform: 'rotate(2deg)',
      opacity: car_images[4] == 'car.png' ? opacity_standard : 1
    }} />
    <img src={car_images[5]} width={110} style={{
      position: 'absolute', 
      top: 80, 
      left: 220,
      transform: 'rotate(9deg)',
      opacity: car_images[5] == 'car.png' ? opacity_standard : 1
    }} />
    <img src={car_images[7]} width={110} style={{
      position: 'absolute', 
      top: 75, 
      left: 355,
      transform: 'rotate(9deg)',
      opacity: car_images[7] == 'car.png' ? opacity_standard : 1
    }} />
    <img src={car_images[9]} width={120} style={{
      position: 'absolute', 
      top: 85, 
      left: 470,
      transform: 'rotate(5deg)',
      opacity: car_images[9] == 'car.png' ? opacity_standard : 1
    }} />
    <img src={car_images[6]} width={100} style={{
      position: 'absolute', 
      top: 120, 
      left: 195, 
      transform: 'scaleX(-1)',
      opacity: car_images[6] == 'car.png' ? opacity_standard : 1
    }} />
    <img src={car_images[8]} width={110} style={{
      position: 'absolute', 
      top: 115, 
      left: 325, 
      transform: 'scaleX(-1)',
      opacity: car_images[8] == 'car.png' ? opacity_standard : 1
    }} />
    </div>
  );
}