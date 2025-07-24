import Link from "next/link";

export default function DocumentationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#008080] to-[#00f5f5] text-black px-6 py-10 md:px-20 ">
    <div className="bg-gradient-to-br from-white to-gray-100 p-20 m-20 rounded-lg">
      <h1 className="text-4xl font-bold font-dancing text-[#008080] mb-6 text-center">Pitch Writer – Documentation</h1>
      <hr className="pb-3 border-black"></hr>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold font-dancing text-[#008080] mb-2">About This Web App</h2>
        <p className="text-base leading-7">
          Pitch Writer is a powerful tool that allows you to <strong>create</strong>, <strong>edit</strong>, and <strong>delete</strong> personalized pitches. You can customize your pitch by selecting a preferred tone and pitch type. Ideal for job applications, cold emails, and personal introductions.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold font-dancing text-[#008080] mb-2">API Used</h2>
        <p className="text-base leading-7">
          We utilize the <Link href="https://huggingface.co/mistralai/Mixtral-8x7B-Instruct-v0.1?client=fetch" className="text-[#008080] underline">Mixtral-8x7B-Instruct</Link> model hosted on Hugging Face. This model is used to generate natural, personalized pitch content based on user inputs.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold font-dancing text-[#008080] mb-2">Contact Us</h2>
        <p className="text-base leading-7">
          Have questions or feedback? Reach out to us via email at <a href="mailto:support@pitchwriter.app" className="text-[#008080] underline">support@pitchwriter.app</a>
        </p>
      </section>

      <section className="mb-20">
        <h2 className="text-2xl font-semibold text-[#008080] font-dancing mb-2">Other Products</h2>
        <ul className="list-disc list-inside text-base leading-7">
          <li>
            <Link href="https://blog-summarizer.vercel.app" className="text-[#008080] underline">
              Blog Summarizer
            </Link> – Extracts and translates blog summaries in simple English and Urdu.
          </li>
          <li>
            <Link href="https://quote-generator.vercel.app" className="text-[#008080] underline">
              Quote Generator
            </Link> – Generate meaningful quotes for inspiration and sharing.
          </li>
        </ul>
      </section>

      <footer className="border-t pt-6 text-sm text-center text-gray-500">
        <p>© 2025 Pitch Writer. All rights reserved.</p>
        <p>
          <Link href="https://github.com/your-github-repo" className="text-[#008080] underline">
            View on GitHub
          </Link>
        </p>
      </footer>
      </div>
    </div>
  );
}
