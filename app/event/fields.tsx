import FormattedInput from '@/components/formattedInput';
import pget from '@/src/helpers/pget';
import { useData } from '@/src/providers/data';
import { useModal } from '@/src/providers/modal';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { eventActions } from '@/src/store/reducers/eventReducer';
import { Box, FormLabel, Grid, Input, Typography } from '@mui/joy';
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
		<Grid container spacing={1} p={2}>
			<Grid sm={4} xs={6}>
				<FormLabel>Current Date</FormLabel>
				<Typography>{format(time, 'PPp')}</Typography>
			</Grid>
			<Grid sm={4} xs={6}>
				<FormLabel>End Date</FormLabel>
				<Typography>{format(endDate, 'PPp')}</Typography>
			</Grid>
			<Grid container sm={4} xs={12} justifyContent='center' alignItems='center'>
				<Typography>
					End{isBefore(time, endDate) ? 's' : 'ed'}{' '}
					{formatDistanceToNow(endDate, { addSuffix: true })}
				</Typography>
			</Grid>
			<Grid sm={3} xs={6}>
				<FormLabel>Shop Cost</FormLabel>
				<Input
					readOnly
					className='numberInput'
					endDecorator='Points'
					value={event.shopExpectedCost}
					onClick={() => showModal(ShopModal, { id: 'shop', props: { eventShopData } })}
				/>
			</Grid>
			<Grid sm={3} xs={6}>
				<FormLabel>Daily Points</FormLabel>
				<Input
					readOnly
					className='numberInput'
					endDecorator='Points'
					value={event.dailyExpected}
					onClick={() => showModal(DailyModal, { id: 'daily' })}
				/>
			</Grid>
			<Grid sm={3} xs={6}>
				<Box>
					<FormLabel>Required Points</FormLabel>
					<Input
						readOnly
						variant='plain'
						className='numberInput'
						endDecorator='Points'
						sx={{ pointerEvents: 'none', bgcolor: 'background.body' }}
						value={neededPoints}
					/>
				</Box>
			</Grid>
			<Grid sm={3} xs={6}>
				<FormLabel>Current Points</FormLabel>
				<FormattedInput
					type='number'
					inputMode='numeric'
					className='numberInput'
					endDecorator='Points'
					value={event.points}
					onChange={({ target }) => dispatch(eventActions.setPoints(parseInt(target.value)))}
					onFocus={({ target }) => target.select()}
				/>
			</Grid>
		</Grid>
	);
}
