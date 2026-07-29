import {RiMailLine, RiMapPinLine, RiGithubLine, RiLinkedinBoxLine} from "react-icons/ri";
export default function Contact(){
    return(
        <section id = "contact" className="py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-8">
                <div className="text-center mb-14">
                    <h2 className="text-4xl font-bold">
                        Contact <span className="text-teal-600">Us</span>
                    </h2>
                    <p className="text-gray-600 mt-4">
                        We'd love to hear from you! Feel free to connnect with us.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 gap-10">

          {/* Left */}

          <div className="space-y-8">

            <div className="flex items-center gap-5">
              <RiMailLine className="text-3xl text-teal-600" />
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-gray-600">
                  nandhinimm4706@gmail.com
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <RiMapPinLine className="text-3xl text-teal-600" />
              <div>
                <h3 className="font-semibold">Location</h3>
                <p className="text-gray-600">
                  Tamil Nadu, India
                </p>
              </div>
            </div>

            <div className="flex gap-6 mt-8">
                <a href="https://github.com/Nandhini4706" target="_blank" rel="noopener noreferrer">
                  <RiGithubLine className="text-4xl cursor-pointer hover:text-teal-600 transition" />
                </a>
                <a href="https://www.linkedin.com/in/nandhini-m-833b25294/" target="_blank" rel="noopener noreferrer">
                  <RiLinkedinBoxLine className="text-4xl cursor-pointer hover:text-teal-600 transition" />
                </a>
            </div>

          </div>

          {/* Right */}

          <form className="bg-white p-8 rounded-2xl shadow-lg space-y-5">

            <input
              type="text"
              placeholder="Your Name"
              className="w-full border rounded-lg p-3"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full border rounded-lg p-3"
            />

            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full border rounded-lg p-3"
            ></textarea>

            <button
              className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg transition"
            >
              Send Message
            </button>

          </form>

        </div>

      </div>
    </section>
    )
}