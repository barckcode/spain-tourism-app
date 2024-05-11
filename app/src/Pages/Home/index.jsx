import { FaGithub } from "react-icons/fa"


export default function Home() {

    return (
        <>
            <div className="relative isolate px-6 pt-14 lg:px-8">
                <div
                    className="absolute inset-x-0 top-[calc(100%-40rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-70rem)]"
                    aria-hidden="true"
                >
                    <div
                        className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#93c5fd] to-[#4f46e5] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                        style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    />
                </div>
                <div className="mx-auto max-w-2xl py-12 sm:py-24 lg:py-36">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                            El turismo en España explicado con datos
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Datos obtenidos de organismos públicos como el Instituto Nacional de Estadística y ayuntamientos de diferentes comunidades autónomas.
                        </p>
                        <a href="https://github.com/barckcode/spain-turism-app" target="_blank" rel="noopener noreferrer" className="text-base font-semibold leading-6 text-gray-900">
                            <div className="mt-10 flex items-center justify-center gap-x-2">
                                <FaGithub />
                                <span aria-hidden="true">Github</span>
                            </div>
                        </a>
                    </div>
                    <div className="text-center py-8 sm:mb-8 sm:flex sm:justify-center">
                        <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                        Sitio web creado por: {' '}
                        <a href="https://twitter.com/barckcode" target="_blank" rel="noopener noreferrer" className="font-semibold text-indigo-600">
                            <span className="absolute inset-0" aria-hidden="true" />
                            @barckcode <span aria-hidden="true">&rarr;</span>
                        </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
