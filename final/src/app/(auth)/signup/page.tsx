import Image from "next/image";
import Link from "next/link";
import SignUpClerkForm from "../../../components/auth/SignUpClerkForm";

export default function Page() {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <div className="flex flex-col">
        <header className="flex items-center justify-between px-8 pt-6">
          <div className="flex items-center gap-3">
            <Image src="/next.svg" alt="" width={28} height={28} />
            <div className="leading-tight">
              <div className="font-semibold text-slate-900">UiUxOtor</div>
              <div className="text-xs text-slate-500">ERP System</div>
            </div>
          </div>
                    <Link href="/login" className="group inline-block">
            <span className="inline-flex rounded-xl p-[2px] bg-gradient-to-r from-[#14ADD6] to-[#384295]">
              <span className="relative inline-flex items-center justify-center rounded-xl bg-white px-7 py-3 transition-colors duration-200 group-hover:bg-gradient-to-r group-hover:from-[#14ADD6] group-hover:to-[#384295]">
                <span className="bg-gradient-to-r from-[#14ADD6] to-[#384295] bg-clip-text text-transparent transition-opacity duration-150 group-hover:opacity-0">Sign In</span>
                <span className="absolute inset-0 grid place-items-center text-white opacity-0 transition-opacity duration-150 group-hover:opacity-100">Sign In</span>
              </span>
            </span>
          </Link>
        </header>

        <main className="flex flex-1 px-8">
          <div className="mx-auto w-full max-w-md pt-16">
            <p className="text-sm text-slate-700">Create your account</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">Sign Up</h1>
            <SignUpClerkForm />
          </div>
        </main>
      </div>

      <div className="relative hidden lg:block min-h-screen">
        <Image
          src="https://picsum.photos/2001"
          alt="Register side"
          fill
          priority
          className="object-cover"
          sizes="(min-width: 1024px) 50vw, 0vw"
        />
      </div>
    </div>
  );
}