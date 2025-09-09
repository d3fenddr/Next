"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Gender, Staff } from "../../../../types/staff";
import { addStaff } from "../../../../lib/staff-store";

export default function Page() {
  const router = useRouter();
  const [firstName,setFirstName]=useState(""); const [lastName,setLastName]=useState("");
  const [gender,setGender]=useState<Gender>("Male"); const [staffId,setStaffId]=useState("");
  const [phone,setPhone]=useState(""); const [role,setRole]=useState("Admin");
  const [designation,setDesignation]=useState("Human Resources");
  const [email,setEmail]=useState(""); const [officialEmail,setOfficialEmail]=useState("");
  const [photo,setPhoto]=useState<string|undefined>();

  function onSelectPhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const f=e.target.files?.[0]; if(!f) return; const r=new FileReader(); r.onload=()=>setPhoto(String(r.result)); r.readAsDataURL(f);
  }
  function onSubmit(e:React.FormEvent){
    e.preventDefault();
    const payload:Omit<Staff,"id">={firstName,lastName,gender,staffId,phone,role,designation,email,officialEmail,photo};
    addStaff(payload);
    const name=`${firstName} ${lastName}`.trim();
    router.push(`/staff/success?t=added&name=${encodeURIComponent(name)}`);
  }

  return (
    <div className="space-y-4">
      <div className="text-lg font-semibold text-slate-900">Add a New Staff</div>
      <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
        <form onSubmit={onSubmit} className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr]">
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/60 p-6">
            <div className="grid place-items-center">
              <label className="grid h-56 w-56 cursor-pointer place-items-center rounded-full border-2 border-dashed border-slate-300 bg-white">
                {photo ? <img src={photo} alt="" className="h-56 w-56 rounded-full object-cover" /> :
                  <div className="text-center text-sm text-slate-500"><div className="mb-2 text-3xl">📷</div><div>Upload photo</div><div className="mt-2 text-xs text-slate-400">JPG, JPEG, PNG · max 2MB</div></div>}
                <input type="file" accept="image/*" onChange={onSelectPhoto} className="hidden" />
              </label>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input label="First name" value={firstName} onChange={setFirstName} required />
              <Input label="Last name" value={lastName} onChange={setLastName} required />
              <Input label="Email address" value={email} onChange={setEmail} />
              <Input label="Phone number" value={phone} onChange={setPhone} />
              <Select label="Gender" value={gender} onChange={v=>setGender(v as Gender)} options={["Male","Female"]} />
              <Select label="Role" value={role} onChange={setRole} options={["Admin","I.T","P.M","None"]} />
              <Input label="Staff ID" value={staffId} onChange={setStaffId} required />
              <Select label="Designation" value={designation} onChange={setDesignation}
                options={["Human Resources","Operations","Project Management","Customer Service","Cleaning","Security"]}/>
              <Input label="Official email" value={officialEmail} onChange={setOfficialEmail} />
            </div>
            <div className="mt-2 flex items-center gap-3">
              <button type="submit" className="rounded-lg bg-slate-900 px-4 py-2 text-sm text-white">Add Staff</button>
              <button type="button" onClick={()=>router.push("/staff")}
                className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700">Cancel</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

function Input({label,value,onChange,required=false}:{label:string;value:string;onChange:(v:string)=>void;required?:boolean}) {
  return (<label className="grid gap-1 text-sm"><span className="text-slate-700">{label}</span>
    <input required={required} value={value} onChange={e=>onChange(e.target.value)}
           className="h-10 rounded-lg border border-slate-200 bg-white px-3 outline-none"/></label>);
}
function Select({label,value,onChange,options}:{label:string;value:string;onChange:(v:string)=>void;options:string[]}) {
  return (<label className="grid gap-1 text-sm"><span className="text-slate-700">{label}</span>
    <select value={value} onChange={e=>onChange(e.target.value)}
            className="h-10 rounded-lg border border-slate-200 bg-white px-3 outline-none">
      {options.map(o=><option key={o} value={o}>{o}</option>)}
    </select></label>);
}
