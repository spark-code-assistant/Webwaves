
// idhr simple JS hai, 11th grade style :)
document.addEventListener('DOMContentLoaded', () => {
  // idhr theme set hoga, default dark. agar user ne save kia ho to woh chalega
  const saved = localStorage.getItem('theme');
  if (saved === 'light') {
    document.documentElement.classList.add('light');
  } else {
    document.documentElement.classList.remove('light');
  }
  
  // idhr bmi ke liye inputs
  const bmiForm = document.getElementById('bmiForm');
  const weightInput = document.getElementById('weight');
  const heightInput = document.getElementById('height');
  const bmiResult = document.getElementById('bmiResult');
  const bmiReset = document.getElementById('bmiReset');

  function interpretBMI(bmi){
    if(bmi < 18.5) return 'Underweight';
    if(bmi < 25) return 'Normal';
    if(bmi < 30) return 'Overweight';
    return 'Obesity';
  }

  // idhr bmi calculate karne ka code
  bmiForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const w = parseFloat(weightInput.value);
    const h = parseFloat(heightInput.value) / 100; // cm ko m me
    if(!w || !h || h <= 0){
      bmiResult.textContent = 'Please enter valid height and weight.';
      return;
    }
    const bmi = w / (h*h);
    const category = interpretBMI(bmi);
    bmiResult.innerHTML = `Your BMI is <strong>${bmi.toFixed(1)}</strong> — <strong>${category}</strong>.`;
  });

  // idhr reset button
  bmiReset.addEventListener('click', ()=>{
    weightInput.value = '';
    heightInput.value = '';
    bmiResult.textContent = 'Enter your details to see results.';
  });

  // idhr tips ka chhota sa array, auto-rotate
  const tips = [
    'Thoda chalna bhi zaroori hai — har ghante 5 minute walk karo.',
    'Sone ka dhyaan rakho — 7–9 ghante ache hote hain.',
    'Meal me protein include karo, muscles repair ke liye.',
    'Pani piyoge to acha lagega — din bhar sip karte raho.',
    'Workout se pehle warm-up aur baad me cool-down zaroor karo.'
  ];
  let tipIndex = 0;
  const tipText = document.getElementById('tipText');
  const prevTip = document.getElementById('prevTip');
  const nextTip = document.getElementById('nextTip');

  function showTip(i){
    tipText.textContent = tips[i % tips.length];
  }

  prevTip.addEventListener('click', ()=>{ tipIndex = (tipIndex - 1 + tips.length) % tips.length; showTip(tipIndex); });
  nextTip.addEventListener('click', ()=>{ tipIndex = (tipIndex + 1) % tips.length; showTip(tipIndex); });
  showTip(tipIndex);
  let tipTimer = setInterval(()=>{ tipIndex = (tipIndex + 1) % tips.length; showTip(tipIndex); }, 5000);

  // idhr pause karne ke liye jab mouse upar ho
  [prevTip,nextTip,tipText].forEach(el => el.addEventListener('mouseenter', ()=> clearInterval(tipTimer)));
  [prevTip,nextTip,tipText].forEach(el => el.addEventListener('mouseleave', ()=> tipTimer = setInterval(()=>{ tipIndex = (tipIndex + 1) % tips.length; showTip(tipIndex); }, 5000)));

  // idhr contact form (demo only)
  const contactForm = document.getElementById('contactForm');
  const contactStatus = document.getElementById('contactStatus');
  contactForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    if(!name || !email || !message){
      contactStatus.textContent = 'Please fill all fields.';
      return;
    }
    contactStatus.textContent = 'Thanks — your message looks great! (This is a demo site.)';
    contactForm.reset();
    setTimeout(()=> contactStatus.textContent = '', 5000);
  });

  // idhr water tracker logic - simple, store in localStorage
  const waterGoalInput = document.getElementById('waterGoal');
  const setWaterGoal = document.getElementById('setWaterGoal');
  const addGlass = document.getElementById('addGlass');
  const waterStatus = document.getElementById('waterStatus');
  const GLASS_ML = 250;

  // load saved
  let savedGoal = parseInt(localStorage.getItem('hw_water_goal') || '0', 10);
  let savedDrank = parseInt(localStorage.getItem('hw_water_drank') || '0', 10);

  function renderWater(){
    if(!savedGoal){
      waterStatus.textContent = 'No goal set';
      return;
    }
    waterStatus.textContent = `${savedDrank} / ${savedGoal} ml`;
  }
  renderWater();

  setWaterGoal.addEventListener('click', ()=>{
    const v = parseInt(waterGoalInput.value, 10);
    if(!v || v <= 0){
      waterStatus.textContent = 'Enter a valid goal (ml)';
      return;
    }
    savedGoal = v;
    savedDrank = 0; // reset progress when new goal set
    localStorage.setItem('hw_water_goal', String(savedGoal));
    localStorage.setItem('hw_water_drank', String(savedDrank));
    renderWater();
  });

  addGlass.addEventListener('click', ()=>{
    if(!savedGoal){
      waterStatus.textContent = 'Set a goal first!';
      return;
    }
    savedDrank += GLASS_ML;
    if(savedDrank > savedGoal) savedDrank = savedGoal; // cap
    localStorage.setItem('hw_water_drank', String(savedDrank));
    renderWater();
  });

  // idhr theme toggle, choice save kar denge
  const themeToggle = document.getElementById('themeToggle');
  themeToggle.addEventListener('click', ()=>{
    const isNowLight = document.documentElement.classList.toggle('light');
    try{
      localStorage.setItem('theme', isNowLight ? 'light' : 'dark');
    }catch(e){ /* agar storage blocked ho to ignore kar dena */ }
  });
});
