import React from 'react'
import { FaPhone, FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa'

export default function Contact() {
    return (
        <div className=" h-[95vh] bg-gray-100 flex items-center justify-center p-6">
            <div className="relative -top-20 w-full max-w-2xl bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-gray-900 text-white p-6">
                    <h1 className="text-3xl font-bold">Get in Touch</h1>
                    <p className="mt-2 text-gray-300">I’d love to hear from you!</p>
                </div>

                <div className="p-6 space-y-6">
                    <div className="flex items-center gap-4">
                        <FaPhone className="text-gray-700 text-2xl" />
                        <div className="text-lg font-medium text-gray-800 hover:text-gray-900 transition">
                            +91 93065 49456
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <FaEnvelope className="text-gray-700 text-2xl" />
                        <a href="mailto:dhimanshubham085@gmail.com" className="text-lg font-medium  text-blue-600 hover:text-blue-800 transition">
                            dhimanshubham085@gmail.com
                        </a>
                    </div>

                    <div className="flex items-center gap-4">
                        <FaLinkedin className="text-gray-700 text-2xl" />
                        <a
                            href="https://www.linkedin.com/in/shubham-dhimann"
                            target="_blank"
                            className="text-lg font-medium text-blue-600 hover:text-blue-800 transition"
                        >
                            linkedin.com/in/shubham-dhimann
                        </a>
                    </div>

                    <div className="flex items-center gap-4">
                        <FaGithub className="text-gray-700 text-2xl" />
                        <a
                            href="https://github.com/ShubhamDhimann"
                            target="_blank"
                            className="text-lg font-medium text-blue-600 hover:text-blue-800 transition"
                        >
                            github.com/ShubhamDhimann
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
