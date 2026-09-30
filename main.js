const b=document.querySelector('.menu'),l=document.querySelector('.links');if(b&&l)b.addEventListener('click',()=>l.classList.toggle('open'));document.querySelectorAll('[data-year]').forEach(e=>e.textContent=new Date().getFullYear());
const contactForm=document.querySelector('#axiomward-contact');
if(contactForm){
  const inquiry=document.querySelector('#inquiry-type'),subject=document.querySelector('#subject'),mailSubject=document.querySelector('#form-subject'),status=document.querySelector('#form-status'),submit=contactForm.querySelector('button[type="submit"]');
  const syncSubject=()=>{mailSubject.value=`[AXIOMWARD WEBSITE] ${inquiry.value}${subject.value.trim()?` — ${subject.value.trim()}`:''}`};
  inquiry.addEventListener('change',syncSubject);subject.addEventListener('input',syncSubject);
  contactForm.addEventListener('submit',async e=>{
    e.preventDefault();syncSubject();status.className='form-status';status.textContent='Sending your inquiry…';submit.disabled=true;
    try{
      const r=await fetch(contactForm.action,{method:'POST',body:new FormData(contactForm),headers:{Accept:'application/json'}});
      if(r.ok){contactForm.reset();syncSubject();status.className='form-status success';status.textContent='Thank you. Your inquiry has been sent to Axiomward Research.'}
      else{status.className='form-status error';status.textContent='We could not send your inquiry. Please try again or email info@axiomwardresearch.com directly.'}
    }catch(err){status.className='form-status error';status.textContent='We could not send your inquiry. Please try again or email info@axiomwardresearch.com directly.'}
    finally{submit.disabled=false}
  });
}
