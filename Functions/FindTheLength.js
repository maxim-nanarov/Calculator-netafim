function FindLength(GivenDp, GivenQ, k, kd, kf, x, Dlat, Dp, pc, sp, Slope) {
  console.log('k: ' + k);
  console.log('kd: ' + kd);
  console.log('kf: ' + kf);
  console.log('x: ' + x);
  console.log('Dlat: ' + Dlat);
  console.log('Dp: ' + Dp);
  console.log('pc: ' + pc);
  console.log('sp: ' + sp);
  let length = 0;
  Slope = Slope / 100;
  console.log('Slope: ' + Slope);
  let Q1 = 0;
  if (Dp < pc) {
    Q1 = kf * Math.pow(Dp, 0.5);
  } else {
    Q1 = kf * Math.pow(pc, 0.5);
  }
  let Qd = 0;
  console.log('Given Q and Dp: ' + GivenQ, GivenDp);
  let counter = 0;
  while (Q1 < GivenQ && Dp < GivenDp) {
    counter++;
    console.log(Dp);
    if (Dp < pc) {
      Qd = k * Math.pow(Dp, x);
    } else {
      Qd = k * Math.pow(pc, x);
    }
    Q1 += Qd;
    Dp += Phw(Q1, Dlat, sp) + Pd(Q1, Dlat, k) + Ps(Slope, sp); // Am I doing the pressure right?
    length += sp;
  }
  console.log('Q1: ' + Q1);
  console.log('Dp: ' + Dp);
  console.log('Length: ' + length);
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
//in this function the given Dp and the Given Q
//are Ultimetly the stoping condition for finding out what kind
//of pressure and flow that the client can give, and in return
//we give him the length of the pipe.
//GivenDp, GivenQ, k, kd, kf, x, Dlat, Dp, pc, sp, Slope
FindLength(6, 1, 0.7, 1.3, 0, 0, 14.2, 5, 5, 0.15, 5);
