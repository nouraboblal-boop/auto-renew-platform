import { useMemo, useState, type FormEvent } from 'react';
import './AutoRenewPremiumAutomotiveLanding.css';

const tabs = {
  ev: {
    label: 'EV Diagnostics',
    title: 'فحص وبرمجة السيارات الكهربائية',
    items: ['SOH / SOC للبطارية', 'ECU / DTC Scan', 'System Programming', 'Cloud Compatibility']
  },
  dilink: {
    label: 'BYD / DiLink',
    title: 'تعريب وتعديل شاشات BYD وDiLink',
    items: ['تعريب الواجهة', 'تثبيت التطبيقات', 'خرائط دون إنترنت', 'تخصيص النظام']
  },
  care: {
    label: 'Protection',
    title: 'الحماية والعناية الفاخرة',
    items: ['PPF', 'Color Vinyl Wrap', 'Nano Ceramic', 'Premium Finishing']
  }
} as const;
const services = [
  { id:'ev', title:'فحص وبرمجة EV', price:90 },
  { id:'dilink', title:'تعريب وأنظمة DiLink', price:65 },
  { id:'ppf', title:'أفلام الحماية PPF', price:550 },
  { id:'vinyl', title:'الفينيل والتجليد', price:480 },
  { id:'ceramic', title:'النانو سيراميك', price:240 }
];
const vehicles = [{id:'sedan',title:'سيدان',factor:1},{id:'suv',title:'SUV / كروس أوفر',factor:1.2},{id:'large',title:'سيارة كبيرة',factor:1.35}];
const packages = [{id:'essential',title:'أساسي',factor:1},{id:'plus',title:'متقدم',factor:1.35},{id:'signature',title:'Signature',factor:1.7}];
const fmt=(n:number)=>new Intl.NumberFormat('en-US',{maximumFractionDigits:0}).format(n);

export const AutoRenewPremiumAutomotiveLanding = ({ whatsappNumber = '' }: { whatsappNumber?: string }) => {
  const [tab,setTab]=useState<keyof typeof tabs>('ev');
  const [service,setService]=useState('ev');
  const [vehicle,setVehicle]=useState('sedan');
  const [pack,setPack]=useState('essential');
  const [name,setName]=useState('');
  const [phone,setPhone]=useState('');
  const [car,setCar]=useState('');
  const [status,setStatus]=useState('');
  const activeService=services.find(v=>v.id===service)||services[0];
  const activeVehicle=vehicles.find(v=>v.id===vehicle)||vehicles[0];
  const activePack=packages.find(v=>v.id===pack)||packages[0];
  const estimate=useMemo(()=>Math.round(activeService.price*activeVehicle.factor*activePack.factor/5)*5,[activeService,activeVehicle,activePack]);
  const destination=whatsappNumber.replace(/[\s()+.-]/g,'');
  const hasDestination=/^[1-9]\d{7,14}$/.test(destination);
  function send(e:FormEvent<HTMLFormElement>){e.preventDefault(); if(!name.trim()||!car.trim()||(phone.match(/\d/g)||[]).length<7){setStatus('أدخل الاسم ورقم الهاتف وطراز السيارة.');return;} if(!hasDestination){setStatus('اضبط رقم واتساب الرسمي لتفعيل الطلب.');return;} const message=['مرحباً Auto Renew، أريد طلب استشارة.',`الاسم: ${name}`,`الهاتف: ${phone}`,`السيارة: ${car}`,`الخدمة: ${activeService.title}`,`الفئة: ${activeVehicle.title}`,`الباقة: ${activePack.title}`,`التقدير: ${fmt(estimate)} USD`,'أفهم أن السعر تقديري والموعد يحتاج تأكيد المركز.'].join('\n'); window.open(`https://wa.me/${destination}?text=${encodeURIComponent(message)}`,'_blank','noopener,noreferrer');}
  const g=tabs[tab];
  return <div dir="rtl" lang="ar" className="arx min-h-screen overflow-hidden bg-[#0B0C10] text-white">
    <header className="fixed inset-x-4 top-4 z-50 mx-auto flex h-16 max-w-[1340px] items-center justify-between rounded-2xl border border-white/10 bg-[#080a0e]/80 px-5 backdrop-blur-2xl">
      <a href="#arx-top" className="flex items-center gap-3" dir="ltr"><span className="grid h-10 w-12 place-items-center rounded-xl border border-cyan-300/30 bg-cyan-300/5 font-black">AR</span><span><b className="arx-display text-xs tracking-[.2em]">AUTO RENEW</b><small className="mt-1 block text-[7px] tracking-[.22em] text-zinc-600">EV • CARE • SYSTEMS</small></span><i className="size-1.5 rounded-full bg-red-500" /></a>
      <nav className="hidden gap-7 text-[11px] font-bold text-zinc-400 md:flex"><a href="#arx-services">الخدمات</a><a href="#arx-ev">تقنيات EV</a><a href="#arx-estimate">حاسبة السعر</a></nav>
      <a href="#arx-estimate" className="rounded-xl bg-cyan-300 px-4 py-2.5 text-[11px] font-black text-[#071014]">حجز سريع ↗</a>
    </header>

    <main>
      <section id="arx-top" className="arx-grid relative flex min-h-[780px] items-center pt-28">
        <div className="arx-wrap grid items-center gap-10 lg:grid-cols-[1.05fr_.95fr]">
          <div><p className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/5 px-3 py-2 arx-display text-[8px] tracking-[.16em] text-cyan-200" dir="ltr">EV DIAGNOSTICS • SMART SYSTEMS • PREMIUM CARE</p><h1 className="mt-7 text-[clamp(3.3rem,8vw,7rem)] font-black leading-[1.05] tracking-tight">التقنية تلتقي<br/><span className="bg-gradient-to-l from-cyan-200 via-cyan-300 to-blue-500 bg-clip-text text-transparent">بأدق التفاصيل.</span></h1><p className="mt-6 max-w-xl text-sm leading-8 text-zinc-400">تشخيص وبرمجة السيارات الحديثة، أنظمة BYD وDiLink، وحلول الحماية والعناية المتقدمة.</p><div className="mt-8 flex flex-wrap gap-3"><a href="#arx-services" className="rounded-xl bg-cyan-300 px-6 py-4 text-xs font-black text-[#071014]">استكشف الخدمات ↙</a><a href="#arx-estimate" className="rounded-xl border border-white/10 bg-white/5 px-6 py-4 text-xs font-bold">احجز فحصاً فورياً</a></div><div className="mt-10 grid max-w-xl grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10">{[['03','مسارات تخصصية'],['05+','نقاط فحص'],['360°','عناية شاملة']].map(([v,l])=><div key={v} className="bg-[#0d1015] p-4"><b className="arx-display text-2xl">{v}</b><small className="mt-2 block text-[9px] text-zinc-600">{l}</small></div>)}</div></div>
          <div className="relative min-h-[480px]"><div className="absolute inset-8 rounded-full bg-cyan-300/5 blur-3xl"/><div className="absolute left-0 right-0 top-[25%] mx-auto max-w-xl rounded-[34px] border border-cyan-300/15 bg-[#0d1015]/80 p-6 shadow-2xl"><div className="flex items-center justify-between"><span className="arx-display text-[9px] tracking-widest text-cyan-300">LIVE SYSTEM VIEW</span><span className="rounded-full border border-emerald-400/20 px-3 py-1 text-[8px] text-emerald-300">● ONLINE</span></div><div className="mt-7 flex h-44 items-end gap-3 rounded-2xl border border-white/5 bg-black/20 p-4">{[82,64,91,73].map((v,i)=><div key={i} className="flex h-full flex-1 items-end rounded-lg bg-white/[.03]"><span style={{height:`${v}%`}} className="arx-bar w-full rounded-t-lg bg-gradient-to-t from-blue-600/50 via-cyan-400/60 to-cyan-200"/></div>)}</div><p className="mt-4 text-[10px] text-zinc-600">واجهة توضيحية لبيانات التشخيص — ليست نتيجة سيارة فعلية.</p></div></div>
        </div>
      </section>

      <section id="arx-services" className="arx-section border-t border-white/5"><div className="arx-wrap"><p className="arx-kicker">AUTO RENEW / EXPERTISE</p><h2 className="mt-4 text-[clamp(2rem,5vw,4.5rem)] font-black leading-[1.2]">خدمات مصممة للسيارة<br/><span className="text-zinc-600">الحديثة، لا للحلول العامة.</span></h2><div className="mt-9 flex flex-wrap gap-2 rounded-2xl border border-white/10 bg-black/20 p-1.5">{(Object.keys(tabs) as Array<keyof typeof tabs>).map(k=><button key={k} onClick={()=>setTab(k)} className={'flex-1 rounded-xl px-4 py-3 text-[10px] font-bold '+(tab===k?'bg-cyan-300 text-[#071014]':'text-zinc-500')}>{tabs[k].label}</button>)}</div><div className="mt-5 grid gap-5 lg:grid-cols-[1.2fr_.8fr]"><div className="rounded-3xl border border-white/10 bg-white/[.025] p-6"><p className="arx-display text-[9px] tracking-widest text-cyan-300">{g.label}</p><h3 className="mt-3 text-2xl font-extrabold">{g.title}</h3><div className="mt-7 grid gap-3 sm:grid-cols-2">{g.items.map((item,i)=><article key={item} className="arx-card min-h-40 rounded-2xl border border-white/10 bg-[#0d1015] p-5"><span className="text-cyan-300">0{i+1}</span><h4 className="mt-7 font-extrabold">{item}</h4><p className="mt-2 text-[11px] leading-6 text-zinc-600">تُنفذ بعد التحقق من توافق الطراز والإصدار وحالة السيارة.</p></article>)}</div></div><div className="rounded-3xl border border-cyan-300/10 bg-[#0d1015] p-6"><p className="arx-display text-[9px] tracking-widest text-cyan-300">PRECISION WORKFLOW</p><div className="mt-8 space-y-5">{['Compatibility check','System scan','Controlled execution','Final verification'].map((x,i)=><div key={x} className="flex items-center gap-4 border-b border-white/5 pb-4"><span className="grid size-9 place-items-center rounded-full border border-cyan-300/20 text-[9px] text-cyan-200">0{i+1}</span><span className="text-xs text-zinc-300" dir="ltr">{x}</span></div>)}</div></div></div></div></section>

      <section id="arx-ev" className="arx-section border-y border-white/5 bg-[#0d1015]"><div className="arx-wrap"><p className="arx-kicker">EV INTELLIGENCE / BEFORE & AFTER</p><div className="mt-4 grid gap-8 lg:grid-cols-2 lg:items-end"><h2 className="text-[clamp(2rem,5vw,4.4rem)] font-black leading-[1.2]">من بيانات مبهمة<br/><span className="text-cyan-300">إلى صورة تقنية أوضح.</span></h2><p className="text-sm leading-8 text-zinc-500">مقارنة بصرية توضيحية لمسار الفحص، ولا تمثل نتائج سيارة فعلية.</p></div><div className="mt-8 grid gap-4 lg:grid-cols-2">{[{t:'قبل الفحص',tone:'amber',data:['SOH غير موثق','SOC قراءة أولية','DTC بحاجة مسح']},{t:'بعد التحليل',tone:'cyan',data:['SOH قراءة موثقة','SOC Live Data','DTC Scan Report']}].map((b,idx)=><div key={b.t} className="rounded-3xl border border-white/10 bg-black/20 p-6"><p className={'arx-display text-[9px] tracking-widest '+(idx?'text-cyan-300':'text-amber-300')}>{idx?'AFTER ANALYSIS':'BEFORE DIAGNOSTIC'}</p><h3 className="mt-2 text-xl font-extrabold">{b.t}</h3><div className="mt-7 space-y-3">{b.data.map(x=><div key={x} className="rounded-xl border border-white/5 bg-white/[.02] p-4 text-xs text-zinc-400">{x}</div>)}</div></div>)}</div></div></section>

      <section id="arx-estimate" className="arx-section"><div className="arx-wrap"><p className="arx-kicker">INTERACTIVE ESTIMATOR</p><h2 className="mt-4 text-[clamp(2rem,5vw,4.4rem)] font-black leading-[1.2]">اختر. شاهد التقدير.<br/><span className="text-zinc-600">ثم أرسل الطلب مباشرة.</span></h2><div className="mt-9 grid gap-4 lg:grid-cols-2"><div className="arx-beam rounded-3xl border border-white/10 bg-white/[.025] p-6"><h3 className="text-xl font-extrabold">إعداد الخدمة</h3>{[['الخدمة',services,service,setService],['فئة السيارة',vehicles,vehicle,setVehicle],['الباقة',packages,pack,setPack]].map(([label,items,value,setter]:any)=><div key={label} className="mt-6"><p className="mb-3 text-[10px] font-bold text-zinc-400">{label}</p><div className="flex flex-wrap gap-2">{items.map((i:any)=><button key={i.id} onClick={()=>setter(i.id)} className={'rounded-xl border px-3 py-2 text-[10px] '+(value===i.id?'border-cyan-300/50 bg-cyan-300/10 text-white':'border-white/10 text-zinc-600')}>{i.title}</button>)}</div></div>)}<div className="mt-7 rounded-2xl border border-cyan-300/15 bg-cyan-300/5 p-5"><small className="text-zinc-500">التقدير المبدئي</small><b className="arx-display mt-2 block text-4xl" dir="ltr">{fmt(estimate)} <span className="text-sm text-cyan-300">USD*</span></b></div></div><form onSubmit={send} className="rounded-3xl border border-white/10 bg-white/[.025] p-6"><h3 className="text-xl font-extrabold">تأكيد الطلب</h3>{[['الاسم الكامل',name,setName,'text'],['رقم التواصل',phone,setPhone,'tel'],['طراز السيارة',car,setCar,'text']].map(([label,value,setter,type]:any)=><label key={label} className="mt-5 block text-[10px] font-bold text-zinc-400">{label}<input value={value} onChange={e=>setter(e.target.value)} type={type} required className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-black/20 px-4 text-xs text-white outline-none focus:border-cyan-300/50"/></label>)}<button type="submit" className="mt-6 w-full rounded-xl bg-cyan-300 px-5 py-4 text-xs font-black text-[#071014]">تأكيد الطلب عبر واتساب ↗</button>{status&&<p className="mt-3 text-[10px] leading-6 text-amber-200">{status}</p>}</form></div></div></section>
    </main>
    <footer className="border-t border-white/5 bg-[#07090c] py-14"><div className="arx-wrap flex flex-col justify-between gap-8 sm:flex-row"><div><b className="arx-display tracking-widest">AUTO RENEW</b><p className="mt-3 max-w-sm text-xs leading-7 text-zinc-600">EV diagnostics, BYD / DiLink systems, protection and premium automotive care.</p></div><div className="flex gap-6 text-[10px] text-zinc-600"><a href="#arx-services">الخدمات</a><a href="#arx-estimate">الحجز</a></div></div></footer>
  </div>;
};
