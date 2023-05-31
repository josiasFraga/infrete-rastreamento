
import * as React from 'react';


export default function RepresentacaoCaminhaoPequena(props) {

    const car_images = props.car_images; 

  return (
    <div style={{position: 'relative', margin: '0 auto', width: 300}}>
    <img src='/truck.png' width={300} style={{position: 'absolute', top: 65, left: 0}} />
    <img src={car_images[10]} width={50} style={{
      position: 'absolute', 
      top: 67, 
      left: 9,
      transform: 'rotate(5deg)'
    }} />
    <img src={car_images[11]} width={52.5} style={{
      position: 'absolute', 
      top: 65, 
      left: 65, 
      transform: 'scaleX(-1)'
    }} />
    <img src={car_images[1]} width={50} style={{
      position: 'absolute', 
      top: 62, 
      left: 123,
      transform: 'rotate(6deg)'
    }} />
    <img src={car_images[2]} width={60} style={{
      position: 'absolute', 
      top: 60, 
      left: 180, 
      transform: 'scaleX(-1) rotate(2deg)',
    }} />
    <img src={car_images[3]} width={55} style={{
      position: 'absolute', 
      top: 65, 
      left: 246,
      transform: 'rotate(7deg)'
    }} />
    <img src={car_images[4]} width={56.5} style={{
      position: 'absolute', 
      top: 90, 
      left: 38,
      transform: 'rotate(2deg)'
    }} />
    <img src={car_images[5]} width={55} style={{
      position: 'absolute', 
      top: 85, 
      left: 97,
      transform: 'rotate(9deg)'
    }} />
    <img src={car_images[7]} width={55} style={{
      position: 'absolute', 
      top: 82, 
      left: 178,
      transform: 'rotate(9deg)'
    }} />
    <img src={car_images[9]} width={60} style={{
      position: 'absolute', 
      top: 87, 
      left: 236,
      transform: 'rotate(5deg)'
    }} />
    <img src={car_images[6]} width={50} style={{
      position: 'absolute', 
      top: 104, 
      left: 99, 
      transform: 'scaleX(-1)'
    }} />
    <img src={car_images[8]} width={55} style={{
      position: 'absolute', 
      top: 102, 
      left: 162, 
      transform: 'scaleX(-1)'
    }} />
    </div>
  );
}