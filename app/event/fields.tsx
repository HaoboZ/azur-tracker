import FormattedTextField from '@/components/formattedTextField';
import pget from '@/src/helpers/pget';
import { useData } from '@/src/providers/data';
import { useModal } from '@/src/providers/modal';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { eventActions } from '@/src/store/reducers/eventReducer';
import { Box, Grid2, inputBaseClasses, TextField, Typography } from '@mui/material';
import { format, formatDistanceToNow, isBefore } from 'date-fns';
import DailyModal from './dailyModal';
import ShopModal from './shopModal';
import type { EventType } from './type';

export default function EventFields({ time, neededPoints }: { time: Date; neededPoints: number }) {
	const event = useAppSelector(pget('event'));
	const dispatch = useAppDispatch();
	const { showModal } = useModal();
	const { eventData, eventShopData } = useData<EventType>();

	const endDate = new Date(eventData.endDate);

	return (
		<Grid2 container spacing={1} sx={{ p: 2 }}>
			<Grid2 size={{ sm: 4, xs: 6 }}>
				<Typography variant='subtitle2'>Current Date</Typography>
				<Typography>{format(time, 'PPp')}</Typography>
			</Grid2>
			<Grid2 size={{ sm: 4, xs: 6 }}>
				<Typography variant='subtitle2'>End Date</Typography>
				<Typography>{format(endDate, 'PPp')}</Typography>
			</Grid2>
			<Grid2
				container
				size={{ sm: 4, xs: 12 }}
				sx={{ justifyContent: 'center', alignItems: 'center' }}>
				<Typography>
					End{isBefore(time, endDate) ? 's' : 'ed'}{' '}
					{formatDistanceToNow(endDate, { addSuffix: true })}
				</Typography>
			</Grid2>
			<Grid2 size={{ sm: 3, xs: 6 }}>
				<Typography variant='subtitle2'>Shop Cost</Typography>
				<TextField
					slotProps={{ input: { readOnly: true, endAdornment: 'Points' } }}
					sx={{ [`.${inputBaseClasses.input}`]: { textAlign: 'right', pr: 1 } }}
					value={event.shopExpectedCost}
					onClick={() => showModal(ShopModal, { id: 'shop', props: { eventShopData } })}
				/>
			</Grid2>
			<Grid2 size={{ sm: 3, xs: 6 }}>
				<Typography variant='subtitle2'>Daily Points</Typography>
				<TextField
					slotProps={{ input: { readOnly: true, endAdornment: 'Points' } }}
					sx={{ [`.${inputBaseClasses.input}`]: { textAlign: 'right', pr: 1 } }}
					value={event.dailyExpected}
					onClick={() => showModal(DailyModal, { id: 'daily' })}
				/>
			</Grid2>
			<Grid2 size={{ sm: 3, xs: 6 }}>
				<Box>
					<Typography variant='subtitle2'>Required Points</Typography>
					<Box
						sx={{
							height: 40,
							display: 'flex',
							justifyContent: 'end',
							alignItems: 'center',
							pr: 2,
						}}>
						<Typography>{neededPoints} Points</Typography>
					</Box>
				</Box>
			</Grid2>
			<Grid2 size={{ sm: 3, xs: 6 }}>
				<Typography variant='subtitle2'>Current Points</Typography>
				<FormattedTextField
					type='number'
					inputMode='numeric'
					slotProps={{ input: { endAdornment: 'Points' } }}
					sx={{ [`.${inputBaseClasses.input}`]: { textAlign: 'right', pr: 1 } }}
					value={event.points}
					onChange={({ target }) => dispatch(eventActions.setPoints(parseInt(target.value)))}
					onFocus={({ target }) => target.select()}
				/>
			</Grid2>
		</Grid2>
	);
}
