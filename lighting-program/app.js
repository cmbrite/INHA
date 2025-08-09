(() => {
  const email = document.getElementById('email');
  const name_ = document.getElementById('name');
  const address = document.getElementById('address');
  const lights = document.getElementById('lights');
  const lightsVal = document.getElementById('lightsVal');
  const perm = document.getElementById('perm');
  const installhelp = document.getElementById('installhelp');
  const helpWrap = document.getElementById('helpWrap');
  const toast = document.getElementById('toast');
  const bar = document.getElementById('bar');

  function updateProgress(){
    const req = [
      email.validity.valid,
      name_.value.trim().length > 0,
      address.value.trim().length > 0,
      !!lights.value,
      perm.checked
    ];
    const done = req.filter(Boolean).length;
    bar.style.width = Math.max(14, Math.round((done / req.length) * 100)) + '%';
  }

  lights.addEventListener('input', () => {
    lightsVal.textContent = lights.value;
    updateProgress();
  });

  [email, name_, address].forEach(el => el.addEventListener('input', updateProgress));

  perm.addEventListener('change', () => {
    helpWrap.classList.toggle('hidden', !perm.checked);
    updateProgress();
  });

  function showErr(id, show){
    const el = document.querySelector(`.err[data-for="${id}"]`);
    if (el) el.style.display = show ? 'block' : 'none';
  }

  document.getElementById('resetBtn').addEventListener('click', () => {
    document.getElementById('lightingForm').reset();
    helpWrap.classList.add('hidden');
    lights.value = 1; // default now 1
    lights.dispatchEvent(new Event('input'));
    ['email','name','address'].forEach(k => showErr(k, false));
    document.querySelector('.err[data-for="permission"]').style.display = 'none';
    updateProgress();
  });

  document.getElementById('submitBtn').addEventListener('click', async () => {
    const valid = email.validity.valid && name_.value.trim() && address.value.trim() && perm.checked;
    showErr('email', !email.validity.valid);
    showErr('name', !name_.value.trim());
    showErr('address', !address.value.trim());
    document.querySelector('.err[data-for="permission"]').style.display = perm.checked ? 'none' : 'block';

    if (!valid){ updateProgress(); return; }

    const payload = {
      email: email.value.trim(),
      name: name_.value.trim(),
      address: address.value.trim(),
      lights: Number(lights.value),
      permission: perm.checked,
      installhelp: perm.checked ? installhelp.value : 'n/a',
      submittedAt: new Date().toISOString()
    };

    try{
      const res = await fetch(window.GAS_URL, { method:'POST', mode:'cors', body: JSON.stringify(payload) });
      if(!res.ok) throw new Error('Submit failed');
      toast.classList.add('show'); setTimeout(()=>toast.classList.remove('show'), 3500);
      document.getElementById('lightingForm').reset();
      helpWrap.classList.add('hidden');
      lights.value = 1; // default now 1
      lights.dispatchEvent(new Event('input'));
      updateProgress();
    }catch(err){
      alert('Submission failed. Please try again later.');
      console.error(err);
    }
  });

  // init
  lights.value = 1; // ensure initial matches your HTML
  lights.dispatchEvent(new Event('input'));
  helpWrap.classList.add('hidden');
  updateProgress();
})();
