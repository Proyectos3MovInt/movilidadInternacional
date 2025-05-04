import * as Icons from '@/components/Icons';

export default function Header() {
    return (
        <div className="self-stretch px-6 py-2 bg-blue-600 rounded-tl-lg rounded-tr-lg border-b border-white inline-flex justify-start items-center gap-2">

            <div className="w-8 h-8 relative">
                <Icons.Warning />
            </div>
            <div className="w-48 h-4 justify-center text-white text-base font-semibold font-['Montserrat'] leading-normal">Chat de incidencias</div>
        </div>
    );
}