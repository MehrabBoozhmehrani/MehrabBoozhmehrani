import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { Award, Briefcase, Code2, Download, ExternalLink, FileText, Github, Globe2, GraduationCap, Mail, MapPin, Menu, Phone, Save, ShieldCheck, Sparkles, UserRound, X } from 'lucide-react';
import { supabase, isSupabaseConfigured } from './lib/supabase';
import './global.css';

type Lang = 'fa' | 'en';
type Bilingual = { fa: string; en: string };
type Portfolio = {
  name: Bilingual; role: Bilingual; location: Bilingual; email: string; phone: string; github: string; instagram: string;
  intro: Bilingual; about: Bilingual; skills: { category: Bilingual; items: string[] }[];
  project: { title: Bilingual; description: Bilingual; url: string; code: string; tags: string[] };
  experience: { title: Bilingual; organization: Bilingual; period: Bilingual; details: Bilingual[] }[];
  education: { title: Bilingual; organization: Bilingual; period: Bilingual; details: Bilingual }[];
  awards: { title: Bilingual; year: string }[];
  certificates: { title: Bilingual; issuer: string; date: string; file: string; topics: Bilingual }[];
  services: { title: Bilingual; description: Bilingual; price: string; unit: Bilingual }[];
};

const initialData: Portfolio = {
  name: { fa: 'مهراب بوژمهرانی', en: 'Mehrab Boozhmehrani' },
  role: { fa: 'برنامه‌نویس پایتون و توسعه‌دهنده وب', en: 'Python Developer & Web Developer' },
  location: { fa: 'نیشابور، ایران', en: 'Neyshabur, Iran' },
  email: 'mehrabboozhmehrani30@gmail.com', phone: '09931929016', github: 'https://github.com/MehrabBoozhmehrani', instagram: 'https://instagram.com/mehrab_boozhmehrani',
  intro: { fa: 'ایده‌ها را به تجربه‌های دیجیتال کاربردی تبدیل می‌کنم.', en: 'Turning ideas into useful digital experiences.' },
  about: { fa: 'من مهراب بوژمهرانی هستم؛ برنامه‌نویس پایتون و توسعه‌دهنده وب از نیشابور. مسیر یادگیری من با مبانی پایتون آغاز شده و به برنامه‌نویسی شی‌گرا، ساخت بازی، رابط‌های گرافیکی، تحلیل داده و آشنایی با هوش مصنوعی رسیده است. در کنار برنامه‌نویسی، تجربه طراحی و توسعه وب‌سایت هیأت شطرنج نیشابور را نیز دارم.', en: 'I am Mehrab Boozhmehrani, a Python programmer and web developer from Neyshabur, Iran. My learning path includes Python fundamentals, object-oriented programming, game development, GUI applications, data analysis, and introductory artificial intelligence. I have also designed and developed the Neyshabur Chess Association website.' },
  skills: [
    { category: { fa: 'برنامه‌نویسی پایتون', en: 'Python Programming' }, items: ['Python', 'OOP', 'Tkinter', 'Pygame'] },
    { category: { fa: 'توسعه وب', en: 'Web Development' }, items: ['HTML', 'CSS', 'JavaScript'] },
    { category: { fa: 'داده و هوش مصنوعی', en: 'Data & AI' }, items: ['NumPy', 'Pandas', 'Matplotlib', 'OpenCV', 'Prompt Engineering'] },
    { category: { fa: 'ابزارها', en: 'Tools' }, items: ['Git', 'GitHub'] },
  ],
  project: { title: { fa: 'وب‌سایت رسمی هیأت شطرنج نیشابور', en: 'Official Neyshabur Chess Association Website' }, description: { fa: 'طراحی و توسعه وب‌سایتی برای انتشار اخبار شطرنج، معرفی مسابقات و رویدادها و نمایش فعالیت‌های شطرنج شهرستان نیشابور.', en: 'Designed and developed a website to publish chess news, introduce tournaments and events, and showcase chess activities in Neyshabur County.' }, url: 'https://neyshabur-chess.vercel.app/', code: 'https://github.com/MehrabBoozhmehrani', tags: ['Web Development', 'Python'] },
  experience: [{ title: { fa: 'توسعه‌دهنده وب', en: 'Web Developer' }, organization: { fa: 'وب‌سایت هیأت شطرنج نیشابور', en: 'Neyshabur Chess Association Website' }, period: { fa: 'پروژه', en: 'Project' }, details: [{ fa: 'طراحی و توسعه وب‌سایت برای اخبار، مسابقات و فعالیت‌های شطرنج شهرستان.', en: 'Designed and developed a website for chess news, tournaments, and local activities.' }] }],
  education: [{ title: { fa: 'دوره‌ها و آموزش‌های برنامه‌نویسی', en: 'Programming Courses' }, organization: { fa: 'PythonTeek', en: 'PythonTeek' }, period: { fa: '۱۴۰۳ تا ۱۴۰۵', en: '2024–2026' }, details: { fa: 'گذراندن دوره‌های پایتون، برنامه‌نویسی شی‌گرا، بازی‌سازی، ساخت اپلیکیشن، علم داده و مبانی هوش مصنوعی.', en: 'Completed courses in Python, object-oriented programming, game development, application development, data science, and introductory AI.' } }],
  awards: [
    { title: { fa: 'مقام سوم مسابقات استانی زیر ۸ سال پسران', en: '3rd Place — Provincial Boys U8 Championship' }, year: '۱۳۹۷' },
    { title: { fa: 'مقام دوم مسابقات برق‌آسای زیر ۸ سال پسران', en: '2nd Place — Boys U8 Blitz' }, year: '۱۳۹۸' },
    { title: { fa: 'مقام اول مسابقات زیر ۱۲ سال پسران', en: '1st Place — Boys U12 Championship' }, year: '۱۳۹۸' },
    { title: { fa: 'مقام دوم مسابقات زیر ۱۰ سال پسران', en: '2nd Place — Boys U10 Championship' }, year: '۱۳۹۸' },
    { title: { fa: 'مقام پنجم مسابقات استانی زیر ۱۰ سال پسران', en: '5th Place — Provincial Boys U10 Championship' }, year: '۱۳۹۹' },
    { title: { fa: 'مقام‌های اول، دوم و سوم مسابقات زیر ۱۲ سال پسران، از جمله برق‌آسا', en: '1st, 2nd and 3rd places in Boys U12 events, including blitz' }, year: '۱۴۰۱' },
    { title: { fa: 'مقام سوم مسابقات تیمی استان با تیم نیشابور', en: '3rd Place — Provincial Team Championship with Neyshabur' }, year: '۱۴۰۲' },
  ],
  certificates: [
    { title: { fa: 'مقدمات پایتون ۱', en: 'Python Fundamentals I' }, issuer: 'PythonTeek', date: '2024/08/05', file: '/certificates/مقدمات یک.pdf', topics: { fa: 'متغیرها، رشته‌ها، عملیات ریاضی، لیست، دیکشنری، تاپل، Turtle و شرط‌ها', en: 'Variables, strings, mathematical operations, lists, dictionaries, tuples, Turtle, and conditional statements' } },
    { title: { fa: 'مقدمات پایتون ۲', en: 'Python Fundamentals II' }, issuer: 'PythonTeek', date: '2024/09/20', file: '/certificates/مقدمات دو.pdf', topics: { fa: 'حلقه‌ها، توابع، آشنایی با GitHub، شرط‌های چندگانه و مدیریت خطا', en: 'Loops, functions, introduction to GitHub, conditional logic, and exception handling' } },
    { title: { fa: 'پایتون متوسط', en: 'Intermediate Python' }, issuer: 'PythonTeek', date: '2024/11/05', file: '/certificates/متوسطه پایتون.pdf', topics: { fa: 'کلاس‌ها و اشیا، وراثت، کار با فایل‌ها و توابع داخلی', en: 'Classes and objects, inheritance, file handling, and built-in functions' } },
    { title: { fa: 'بازی‌سازی با پایتون', en: 'Game Development with Python' }, issuer: 'PythonTeek', date: '2025/01/26', file: '/certificates/بازی سازی.pdf', topics: { fa: 'ماژول Pygame', en: 'Pygame module' } },
    { title: { fa: 'ساخت اپلیکیشن با پایتون', en: 'Application Development with Python' }, issuer: 'PythonTeek', date: '2025/07/29', file: '/certificates/اپلیکیشن سازی.pdf', topics: { fa: 'برنامه‌نویسی رابط گرافیکی با Tkinter، مدیریت ویجت‌ها، رویدادها و گرافیک', en: 'GUI programming with Tkinter, widget management, event handling, and graphics' } },
    { title: { fa: 'علم داده با پایتون', en: 'Data Science with Python' }, issuer: 'PythonTeek', date: '2025/11/05', file: '/certificates/علم داده.pdf', topics: { fa: 'ماژول‌های Matplotlib، NumPy و Pandas', en: 'Matplotlib, NumPy, and Pandas modules' } },
    { title: { fa: 'مبانی هوش مصنوعی', en: 'Introduction to Artificial Intelligence' }, issuer: 'PythonTeek', date: '2026/09/23', file: '/certificates/هوش مصنوعی1.pdf', topics: { fa: 'مفاهیم هوش مصنوعی و یادگیری ماشین، مهندسی پرامپت، تبدیل متن به گفتار، بینایی ماشین و تشخیص گفتار', en: 'AI and machine learning concepts, prompt engineering, text-to-speech, computer vision, and speech recognition' } },
  ],
  services: [
    { title: { fa: 'توسعه وب‌سایت', en: 'Website Development' }, description: { fa: 'طراحی و پیاده‌سازی وب‌سایت‌های معرفی و شخصی.', en: 'Design and development of personal and informational websites.' }, price: 'توافقی', unit: { fa: 'بسته به امکانات', en: 'Based on requirements' } },
    { title: { fa: 'برنامه‌نویسی پایتون', en: 'Python Programming' }, description: { fa: 'ساخت اسکریپت‌ها و ابزارهای کاربردی پایتون.', en: 'Building useful Python scripts and utilities.' }, price: 'توافقی', unit: { fa: 'بسته به پروژه', en: 'Per project' } },
    { title: { fa: 'ساخت اپلیکیشن ساده', en: 'Simple App Development' }, description: { fa: 'ساخت برنامه‌های دسکتاپ ساده با رابط گرافیکی.', en: 'Creating simple desktop applications with graphical interfaces.' }, price: 'توافقی', unit: { fa: 'بسته به امکانات', en: 'Based on requirements' } },
  ],
};

const text = (v: Bilingual | string | undefined, lang: Lang) => typeof v === 'string' ? v : (v?.[lang] ?? '');

function Admin({
  data,
  onSave,
  onClose,
  lang,
  isAdmin,
  userEmail,
  onLogin,
  onLogout,
}: {
  data: Portfolio;
  onSave: (d: Portfolio) => Promise<void>;
  onClose: () => void;
  lang: Lang;
  isAdmin: boolean;
  userEmail: string;
  onLogin: (email: string, password: string) => Promise<void>;
  onLogout: () => Promise<void>;
}) {
  const [draft, setDraft] = useState(JSON.stringify(data, null, 2));
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const fa = lang === 'fa';

  useEffect(() => {
    setDraft(JSON.stringify(data, null, 2));
  }, [data]);

  const login = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      await onLogin(email.trim(), password);
      setPassword('');
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : (fa ? 'ورود انجام نشد.' : 'Sign-in failed.'));
    } finally {
      setBusy(false);
    }
  };

  const save = async () => {
    setBusy(true);
    setError('');
    try {
      const parsed = JSON.parse(draft) as Portfolio;
      await onSave(parsed);
      alert(fa ? 'تغییرات روی سایت ذخیره شد.' : 'Changes were saved to the live site.');
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : (fa ? 'ذخیره‌سازی انجام نشد.' : 'Save failed.'));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="admin-backdrop">
      <section className="admin-panel" dir={fa ? 'rtl' : 'ltr'}>
        <header className="admin-head">
          <div>
            <span className="eyebrow">PRIVATE WORKSPACE</span>
            <h2>{fa ? 'پنل مدیریت محتوا' : 'Content Admin'}</h2>
            <p>{fa ? 'مدیریت امن اطلاعات و محتوای پورتفولیو' : 'Secure portfolio content management'}</p>
          </div>
          <button className="icon-btn" onClick={onClose} aria-label="Close"><X /></button>
        </header>

        {!isSupabaseConfigured ? (
          <div className="admin-notice">
            <ShieldCheck size={18} />
            <span>{fa ? 'اتصال Supabase تنظیم نشده است. مقادیر VITE_SUPABASE_URL و VITE_SUPABASE_ANON_KEY را در فایل .env.local وارد و در Vercel نیز تعریف کنید.' : 'Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local and in Vercel project settings.'}</span>
          </div>
        ) : !isAdmin ? (
          <form className="admin-login-form" onSubmit={login}>
            <div className="admin-notice">
              <ShieldCheck size={18} />
              <span>{fa ? 'ورود فقط برای حسابی مجاز است که شناسه آن در فهرست مدیران Supabase ثبت شده باشد.' : 'Only accounts explicitly allow-listed in Supabase can access the editor.'}</span>
            </div>
            <label className="editor-label" htmlFor="admin-email">{fa ? 'ایمیل مدیر' : 'Admin email'}</label>
            <input id="admin-email" className="admin-input" type="email" autoComplete="username" required value={email} onChange={e => setEmail(e.target.value)} />
            <label className="editor-label" htmlFor="admin-password">{fa ? 'رمز عبور' : 'Password'}</label>
            <input id="admin-password" className="admin-input" type="password" autoComplete="current-password" required value={password} onChange={e => setPassword(e.target.value)} />
            {error && <p className="error-text">{error}</p>}
            <div className="admin-actions">
              <button className="btn btn-primary" type="submit" disabled={busy}>{busy ? (fa ? 'در حال ورود...' : 'Signing in...') : (fa ? 'ورود امن' : 'Secure sign in')}</button>
            </div>
          </form>
        ) : (
          <>
            <div className="admin-notice">
              <ShieldCheck size={18} />
              <span>{fa ? `وارد شده‌اید: ${userEmail}. تغییرات پس از ذخیره برای همه بازدیدکنندگان نمایش داده می‌شود.` : `Signed in as ${userEmail}. Saved changes are shared with all visitors.`}</span>
            </div>
            <label className="editor-label">{fa ? 'ویرایش همه اطلاعات (JSON)' : 'Edit all content (JSON)'}</label>
            <textarea className="json-editor" spellCheck={false} value={draft} onChange={e => setDraft(e.target.value)} />
            <p className="editor-hint">{fa ? 'مقادیر fa و en را جداگانه ویرایش کنید. قیمت‌ها در services قرار دارند.' : 'Edit fa and en independently. Service prices are in services.'}</p>
            {error && <p className="error-text">{error}</p>}
            <div className="admin-actions">
              <button className="btn btn-primary" onClick={save} disabled={busy}><Save size={17} />{busy ? (fa ? 'در حال ذخیره...' : 'Saving...') : (fa ? 'ذخیره روی سایت' : 'Save to website')}</button>
              <button className="btn btn-ghost" onClick={() => {
                const blob = new Blob([draft], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'mehrab-portfolio-content.json';
                a.click();
                URL.revokeObjectURL(url);
              }}><Download size={17} />{fa ? 'خروجی گرفتن' : 'Export JSON'}</button>
              <label className="btn btn-ghost upload-btn">{fa ? 'ورود فایل' : 'Import JSON'}<input type="file" accept="application/json" onChange={e => {
                const f = e.target.files?.[0];
                if (f) {
                  const reader = new FileReader();
                  reader.onload = () => setDraft(String(reader.result));
                  reader.readAsText(f);
                }
              }} /></label>
              <button className="btn btn-ghost" onClick={() => void onLogout()}>{fa ? 'خروج از حساب' : 'Sign out'}</button>
            </div>
          </>
        )}
      </section>
    </div>
  );
}

export function App() {
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem('mehrab-lang') as Lang) || 'fa');
  const [data, setData] = useState<Portfolio>(initialData);
  const [admin, setAdmin] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [sessionUser, setSessionUser] = useState<{ id: string; email: string } | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authReady, setAuthReady] = useState(false);
  const fa = lang === 'fa';
  useEffect(() => { document.documentElement.lang = lang; document.documentElement.dir = fa ? 'rtl' : 'ltr'; document.body.dir = fa ? 'rtl' : 'ltr'; }, [lang, fa]);

  useEffect(() => {
    if (!supabase) {
      setAuthReady(true);
      return;
    }
    let active = true;
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!active) return;
      setSessionUser(session?.user ? { id: session.user.id, email: session.user.email ?? '' } : null);
      setAuthReady(true);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!active) return;
      setSessionUser(session?.user ? { id: session.user.id, email: session.user.email ?? '' } : null);
    });
    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!supabase || !sessionUser) {
      setIsAdmin(false);
      return;
    }
    let active = true;
    supabase.rpc('is_portfolio_admin').then(({ data: allowed, error }) => {
      if (active) setIsAdmin(!error && allowed === true);
    });
    return () => { active = false; };
  }, [sessionUser]);

  useEffect(() => {
    if (!supabase) return;
    let active = true;
    supabase.from('portfolio_content').select('content').eq('id', 'main').maybeSingle().then(({ data: row }) => {
      if (active && row?.content) setData({ ...initialData, ...(row.content as Portfolio) });
    });
    return () => { active = false; };
  }, []);

  const handleLogin = async (email: string, password: string) => {
    if (!supabase) throw new Error('Supabase is not configured.');
    const { data: signInData, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    const { data: allowed, error: roleError } = await supabase.rpc('is_portfolio_admin');
    if (roleError || allowed !== true) {
      await supabase.auth.signOut();
      throw new Error(fa ? 'این حساب دسترسی مدیر ندارد.' : 'This account is not authorized as an administrator.');
    }
    if (signInData.user) setSessionUser({ id: signInData.user.id, email: signInData.user.email ?? email });
    setIsAdmin(true);
  };

  const handleLogout = async () => {
    if (supabase) await supabase.auth.signOut();
    setSessionUser(null);
    setIsAdmin(false);
  };

  const saveData = async (next: Portfolio) => {
    if (!supabase || !isAdmin) throw new Error(fa ? 'دسترسی مدیر تأیید نشده است.' : 'Administrator access is not verified.');
    const { error } = await supabase.from('portfolio_content').upsert({ id: 'main', content: next, updated_at: new Date().toISOString() });
    if (error) throw error;
    setData(next);
  };
  const nav = [{ id: 'about', label: fa ? 'درباره من' : 'About' }, { id: 'skills', label: fa ? 'مهارت‌ها' : 'Skills' }, { id: 'experience', label: fa ? 'سوابق' : 'Experience' }, { id: 'education', label: fa ? 'آموزش' : 'Education' }, { id: 'projects', label: fa ? 'پروژه‌ها' : 'Projects' }, { id: 'awards', label: fa ? 'افتخارات' : 'Awards' }, { id: 'certificates', label: fa ? 'مدارک' : 'Certificates' }, { id: 'services', label: fa ? 'خدمات' : 'Services' }, { id: 'contact', label: fa ? 'ارتباط' : 'Contact' }];
  const resumeText = useMemo(() => `${text(data.name, lang)}\n${text(data.role, lang)}\n${text(data.location, lang)}\n${data.email}\n${text(data.about, lang)}\n\n${fa ? 'مهارت‌ها' : 'Skills'}\n${data.skills.map(s => `${text(s.category, lang)}: ${s.items.join(', ')}`).join('\n')}\n\n${fa ? 'سوابق' : 'Experience'}\n${data.experience.map(e => `${text(e.title, lang)} — ${text(e.organization, lang)} (${text(e.period, lang)})\n${e.details.map(d => text(d, lang)).join('\n')}`).join('\n')}\n\n${fa ? 'تحصیلات و دوره‌ها' : 'Education & Courses'}\n${data.education.map(e => `${text(e.title, lang)} — ${text(e.organization, lang)} (${text(e.period, lang)})\n${text(e.details, lang)}`).join('\n')}\n\n${fa ? 'پروژه' : 'Project'}\n${text(data.project.title,lang)}\n${text(data.project.description,lang)}\n\n${fa ? 'افتخارات' : 'Awards'}\n${data.awards.map(a => `${text(a.title,lang)} — ${a.year}`).join('\n')}\n\n${fa ? 'گواهینامه‌ها' : 'Certificates'}\n${data.certificates.map(c => `${text(c.title,lang)} — ${c.issuer} (${c.date})`).join('\n')}`, [data, lang, fa]);
  const downloadResume = () => { const safe = resumeText.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); const html = `<!doctype html><html lang="${lang}" dir="${fa ? 'rtl' : 'ltr'}"><meta charset="utf-8"><title>${text(data.name,lang)} — Resume</title><style>body{font-family:Tahoma,Arial,sans-serif;max-width:850px;margin:45px auto;padding:0 28px;color:#18221b;line-height:2}h1{color:#245d3c;border-bottom:2px solid #b8e0c4;padding-bottom:12px}pre{white-space:pre-wrap;font:15px/2 Tahoma,Arial,sans-serif}@media print{body{margin:12mm auto}}</style><h1>${text(data.name,lang)}</h1><pre>${safe}</pre></html>`; const blob = new Blob([html], { type: 'text/html;charset=utf-8' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = fa ? 'Mehrab-Boozhmehrani-Resume-FA.html' : 'Mehrab-Boozhmehrani-Resume-EN.html'; a.click(); URL.revokeObjectURL(url); };
  return <div className="site" dir={fa ? 'rtl' : 'ltr'}>
    <header className="topbar"><a className="brand" href="#home"><span className="brand-mark">M</span><span>{text(data.name, lang)}</span></a><button className="menu-toggle" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Menu"><Menu/></button><nav className={mobileMenu ? 'nav-links open' : 'nav-links'}>{nav.map(n => <a key={n.id} href={`#${n.id}`} onClick={() => setMobileMenu(false)}>{n.label}</a>)}</nav><div className="top-actions"><button className="lang-btn" onClick={() => { const n = fa ? 'en' : 'fa'; setLang(n); localStorage.setItem('mehrab-lang', n); }}>{fa ? 'EN' : 'فا'}</button><button className="admin-trigger" onClick={() => setAdmin(true)}>{fa ? 'مدیریت' : 'Admin'}</button></div></header>
    <main>
      <section className="hero section-wrap" id="home"><div className="hero-copy"><span className="eyebrow"><Sparkles size={15}/> {fa ? 'پورتفولیوی شخصی' : 'PERSONAL PORTFOLIO'}</span><h1>{fa ? <>سلام، من <em>{text(data.name, lang)}</em> هستم.</> : <>Hi, I'm <em>{text(data.name, lang)}</em>.</>}</h1><h2>{text(data.role, lang)}</h2><p className="hero-intro">{text(data.intro, lang)}</p><p className="hero-about">{text(data.about, lang)}</p><div className="hero-buttons"><a className="btn btn-primary" href="#projects">{fa ? 'مشاهده پروژه‌ها' : 'Explore projects'} <ExternalLink size={16}/></a><button className="btn btn-outline" onClick={downloadResume}><Download size={16}/>{fa ? 'دریافت رزومه' : 'Download resume'}</button></div><div className="quick-meta"><span><MapPin size={15}/>{text(data.location, lang)}</span><a href={`mailto:${data.email}`}><Mail size={15}/>{data.email}</a></div></div><div className="hero-visual"><div className="portrait-ring"><img src="/mehrab-profile.png" alt={text(data.name, lang)} onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}/><div className="portrait-fallback">MB</div></div><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="float-tag tag-python">Python</div><div className="float-tag tag-web">Web Dev</div><div className="float-tag tag-ai">AI</div></div></section>
      <section className="content-section" id="about"><div className="section-wrap"><SectionTitle eyebrow={fa ? 'معرفی' : 'INTRODUCTION'} title={fa ? 'درباره من' : 'About me'}/><div className="about-card"><UserRound/><p>{text(data.about, lang)}</p></div></div></section>
      <section className="content-section alt" id="skills"><div className="section-wrap"><SectionTitle eyebrow={fa ? 'توانمندی‌ها' : 'WHAT I WORK WITH'} title={fa ? 'مهارت‌ها' : 'Skills'}/><div className="skill-grid">{data.skills.map((s,i)=><article className="skill-card" key={i}><span className="skill-number">0{i+1}</span><h3>{text(s.category,lang)}</h3><div className="chips">{s.items.map(x=><span key={x}>{x}</span>)}</div></article>)}</div></div></section>
      <section className="content-section" id="experience"><div className="section-wrap"><SectionTitle eyebrow={fa ? 'مسیر حرفه‌ای' : 'JOURNEY'} title={fa ? 'سوابق و تجربه' : 'Experience'}/><div className="timeline">{data.experience.map((e,i)=><article className="timeline-card" key={i}><span className="timeline-dot"/><div className="timeline-head"><div><h3>{text(e.title,lang)}</h3><h4>{text(e.organization,lang)}</h4></div><span>{text(e.period,lang)}</span></div><ul>{e.details.map((d,j)=><li key={j}>{text(d,lang)}</li>)}</ul></article>)}</div></div></section>
      <section className="content-section alt" id="education"><div className="section-wrap"><SectionTitle eyebrow={fa ? 'یادگیری مستمر' : 'LEARNING'} title={fa ? 'تحصیلات و دوره‌ها' : 'Education & Courses'}/><div className="education-grid">{data.education.map((e,i)=><article className="education-card" key={i}><GraduationCap/><span className="period">{text(e.period,lang)}</span><h3>{text(e.title,lang)}</h3><h4>{text(e.organization,lang)}</h4><p>{text(e.details,lang)}</p></article>)}</div></div></section>
      <section className="content-section" id="projects"><div className="section-wrap"><SectionTitle eyebrow={fa ? 'چیزهایی که ساخته‌ام' : 'SELECTED WORK'} title={fa ? 'پروژه شاخص' : 'Featured project'}/><article className="project-card"><div className="project-icon"><Code2 size={42}/></div><div className="project-content"><span className="eyebrow">WEB DEVELOPMENT</span><h3>{text(data.project.title,lang)}</h3><p>{text(data.project.description,lang)}</p><div className="chips">{data.project.tags.map(t=><span key={t}>{t}</span>)}</div><div className="project-links"><a href={data.project.url} target="_blank" rel="noreferrer">{fa ? 'مشاهده وب‌سایت' : 'Visit website'} <ExternalLink size={15}/></a><a href={data.project.code} target="_blank" rel="noreferrer"><Github size={15}/> GitHub</a></div></div></article></div></section>
      <section className="content-section alt" id="awards"><div className="section-wrap"><SectionTitle eyebrow={fa ? 'رقابت‌ها' : 'COMPETITIVE HIGHLIGHTS'} title={fa ? 'افتخارات شطرنج' : 'Chess achievements'}/><div className="award-grid">{data.awards.map((a,i)=><article className="award-card" key={i}><Award/><p>{text(a.title,lang)}</p><span>{a.year}</span></article>)}</div></div></section>
      <section className="content-section" id="certificates"><div className="section-wrap"><SectionTitle eyebrow={fa ? 'گواهی‌های آموزشی' : 'PROFESSIONAL LEARNING'} title={fa ? 'مدارک و گواهینامه‌ها' : 'Certificates'}/><div className="certificate-grid">{data.certificates.map((c,i)=><article className="certificate-card" key={i}><div className="cert-icon"><FileText/></div><div><h3>{text(c.title,lang)}</h3><span>{c.issuer} · {c.date}</span><p>{text(c.topics,lang)}</p><a href={encodeURI(c.file)} target="_blank" rel="noreferrer">{fa ? 'مشاهده مدرک' : 'View certificate'} <ExternalLink size={14}/></a></div></article>)}</div></div></section>
      <section className="content-section alt" id="services"><div className="section-wrap"><SectionTitle eyebrow={fa ? 'همکاری' : 'WORK WITH ME'} title={fa ? 'خدمات' : 'Services'}/><div className="service-grid">{data.services.map((s,i)=><article className="service-card" key={i}><Briefcase/><h3>{text(s.title,lang)}</h3><p>{text(s.description,lang)}</p><div className="price-line"><strong>{s.price}</strong><span>{text(s.unit,lang)}</span></div></article>)}</div></div></section>
      <section className="contact-section" id="contact"><div className="section-wrap contact-inner"><div><span className="eyebrow">{fa ? 'در تماس باشیم' : 'GET IN TOUCH'}</span><h2>{fa ? 'برای یک همکاری خوب آماده‌ام.' : 'Let’s build something useful.'}</h2><p>{fa ? 'برای گفتگو درباره پروژه یا همکاری، از راه‌های زیر پیام بدهید.' : 'Reach out to discuss a project or collaboration.'}</p></div><div className="contact-links"><a href={`mailto:${data.email}`}><Mail/>{data.email}</a><a href={`tel:${data.phone}`}><Phone/>{data.phone}</a><a href={data.github} target="_blank" rel="noreferrer"><Github/>GitHub</a><a href={data.instagram} target="_blank" rel="noreferrer"><Globe2/>Instagram</a></div></div></section>
    </main><footer className="footer"><span>© {new Date().getFullYear()} {text(data.name,lang)}</span><span>{fa ? 'ساخته‌شده با تمرکز بر سادگی و عملکرد' : 'Designed with clarity and performance in mind'}</span></footer>
    {admin && <Admin data={data} onSave={saveData} onClose={() => setAdmin(false)} lang={lang} isAdmin={isAdmin && authReady} userEmail={sessionUser?.email ?? ''} onLogin={handleLogin} onLogout={handleLogout}/>}
  </div>;
}
function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) { return <div className="section-title"><span>{eyebrow}</span><h2>{title}</h2></div>; }
