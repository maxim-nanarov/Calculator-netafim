function Calculate(k, kf, x, Dlat, Dp, pc, Length, sp, Slope) {
  console.log('k: ' + k);
  console.log('kf: ' + kf);
  console.log('x: ' + x);
  console.log('Dlat: ' + Dlat);
  console.log('Dp: ' + Dp);
  console.log('pc: ' + pc);
  console.log('Length: ' + Length);
  console.log('sp: ' + sp);
  console.log('Slope: ' + Slope);
  let Q1;
  if (Dp < pc) {
    Q1 = kf * Math.pow(Dp, 0.5);
  } else {
    Q1 = kf * Math.pow(pc, x);
  }
  console.log(Q1);
  let Qd = 0;
  let leng = Length / sp;
  for (let i = 0; i <= leng; i++) {
    if (Dp < pc) {
      Qd = k * Math.pow(Dp, x);
    } else {
      Qd = k * Math.pow(pc, x);
    }
    Q1 += Qd;
    Dp += Phw(Q1, Dlat, sp) + Pd(Q1, Dlat, k) + Ps(Slope, sp); // Am I doing the pressure right?
  }
  console.log('Q1: ' + Q1);
  console.log('Dp: ' + Dp);
  //the tube with the drippers
}
function Phw(Qlat, Dlat, sp) {
  let Q = Math.pow(Qlat, 1.76);
  let D = Math.pow(Dlat, -4.76);
  return 0.4364 * Q * D * sp;
}
//the tube
function Pd(Qlat, Dlat, kd) {
  let Q = Math.pow(Qlat, 2);
  let D = Math.pow(Dlat, -4);
  return 6.367 * Math.pow(10, -3) * Q * D * kd;
}
//slope and length
function Ps(Slope, Length) {
  return Slope * Length;
}

console.log('Uni Ram first option (from the Table)');
console.log('and 16009 pipe');

//the functions is taking the parameters in this order:
// Calculate(k, kf, x, Dlat, Dp, pc, Length, sp, Slope
Calculate(0.7, 3, 0, 14.2, 3, 0.5, 1, 1, 0);
