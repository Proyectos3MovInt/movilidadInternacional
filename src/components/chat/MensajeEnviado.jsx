import * as Icons from '@/components/Icons';

export default function MensajeEnviado({ msg }) {
    return (
        <div className="self-stretch inline-flex justify-end items-start gap-2">
            <div className="px-4 py-2 bg-blue-300 rounded-lg flex justify-center items-center gap-2">
                <div className="justify-start text-white text-base font-normal font-['Montserrat'] leading-normal">{msg}</div>
            </div>
            <div className="p-2 bg-white rounded-3xl outline outline-1 outline-offset-[-1px] outline-blue-300 flex justify-start items-center gap-2">
                <div className="w-6 h-6 relative overflow-hidden">
                    <Icons.PersonBlueChat />
                </div>
            </div>
        </div>
    );
}