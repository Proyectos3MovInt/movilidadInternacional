import * as Icons from '@/components/Icons';

export default function MensajeRecibido({ msg, date }) {
    return (
        <>
            <div className="inline-flex justify-start items-start gap-2">
                <div className="p-2 bg-blue-300 rounded-3xl flex justify-start items-center gap-2">
                    <div className="w-6 h-6 relative overflow-hidden">
                        <Icons.PersonWhiteChat />
                    </div>
                </div>
                <div className="px-4 py-2 bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-blue-300 flex justify-center items-center gap-2">
                    <div className="justify-start text-slate-900 text-base font-normal font-['Montserrat'] leading-normal">{msg}</div>
                </div>
            </div>
            <span className="text-xs text-gray-500 mt-1">{date}</span>
        </>
    );
}