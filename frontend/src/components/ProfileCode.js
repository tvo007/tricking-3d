import React, { useEffect, useState } from "react";
import { MdOutlineQrCode2, MdQrCodeScanner } from "react-icons/md";
import QRGenerator from "../components/QRGenerator";
import QRReader from "../components/QRReader";

const ProfileCode = () => {
	const [showQR, setShowQR] = useState(false);
	const [showQrReader, setShowQrReader] = useState(false);
	useEffect(() => {
		if (showQR === true) {
			setShowQrReader(false);
			setShowQR(true);
		}
	}, [showQR]);
	useEffect(() => {
		if (showQrReader === true) {
			setShowQR(false);
			setShowQrReader(true);
		}
	}, [showQrReader]);
	return (
		<>
			<div className='flex gap-3'>
				<button
					className=' flex w-20 flex-col place-items-center rounded-lg bg-zinc-700'
					onClick={() => setShowQR(!showQR)}>
					<MdOutlineQrCode2 className='h-12 w-12' />
					<div>Generate</div>
				</button>
				<button
					className='flex w-20 flex-col place-items-center rounded-lg bg-red-700'
					onClick={() => setShowQrReader(!showQrReader)}>
					<MdQrCodeScanner className='h-12 w-12' />
					<div>Scan</div>
				</button>
			</div>
			<div className='flex w-full flex-col place-content-center place-items-center'>
				{showQR && <QRGenerator />}
				{showQrReader && <QRReader />}
			</div>
		</>
	);
};

export default ProfileCode;
