import FormattedTextField from '@/components/formattedTextField';
import { useData } from '@/src/providers/data';
import { useModal } from '@/src/providers/modal';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { eventActions } from '@/src/store/reducers/eventReducer';
import { Box, Grid, InputAdornment, InputLabel, TextField, Typography } from '@mui/material';
import { format, formatDistanceToNow, isBefore } from 'date-fns';
import DailyModal from './dailyModal';
import ShopModal from './shopModal';
import type { EventType } from './type';

export default function EventFields({ time, neededPoints }: { time: Date; neededPoints: number }) {
	const event = useAppSelector(({ event }) => event);
	const dispatch = useAppDispatch();
	const { showModal } = useModal();
	const { eventData, eventShopData } = useData<EventType>();

	const endDate = new Date(eventData.endDate);

	return (
		<Grid container spacing={2} px={2} sx={{ '.rightInput': { textAlign: 'right' } }}>
			<Grid item container xs={12} justifyContent='center'>
				<Typography variant='h3' color='textPrimary'>
					{eventData.name}
				</Typography>
			</Grid>
			<Grid item sm={4} xs={6}>
				<InputLabel shrink>Current Date</InputLabel>
				<Typography>{format(time, 'PPp')}</Typography>
			</Grid>
			<Grid item sm={4} xs={6}>
				<InputLabel shrink>End Date</InputLabel>
				<Typography>{format(endDate, 'PPp')}</Typography>
			</Grid>
			<Grid item container sm={4} xs={12} justifyContent='center' alignItems='center'>
				<Typography>
					End{isBefore(time, endDate) ? 's' : 'ed'}{' '}
					{formatDistanceToNow(endDate, { addSuffix: true })}
				</Typography>
			</Grid>
			<Grid item sm={3} xs={6}>
				<FormattedTextField
					id='shop'
					type='text'
					label='Shop Cost'
					inputProps={{ className: 'rightInput' }}
					InputProps={{
						readOnly: true,
						endAdornment: <InputAdornment position='end'>Points</InputAdornment>,
					}}
					value={event.shopExpectedCost}
					onClick={() => showModal(ShopModal, { id: 'shop', props: { eventShopData } })}
				/>
			</Grid>
			<Grid item sm={3} xs={6}>
				<TextField
					id='daily'
					type='text'
					label='Daily Points'
					inputProps={{ className: 'rightInput' }}
					InputProps={{
						readOnly: true,
						endAdornment: <InputAdornment position='end'>Points</InputAdornment>,
					}}
					value={event.dailyExpected}
					onClick={() => showModal(DailyModal, { id: 'daily' })}
				/>
			</Grid>
			<Grid item sm={3} xs={6}>
				<Box id='required'>
					<InputLabel shrink>Required Points</InputLabel>
					<Typography>{neededPoints} Points</Typography>
				</Box>
			</Grid>
			<Grid item sm={3} xs={6}>
				<FormattedTextField
					id='current'
					type='number'
					label='Current Points'
					inputMode='numeric'
					className='numberInput'
					InputProps={{ endAdornment: <InputAdornment position='end'>Points</InputAdornment> }}
					value={event.points}
					onChange={({ target }) => dispatch(eventActions.setPoints(parseInt(target.value)))}
					onFocus={({ target }) => target.select()}
				/>
			</Grid>
		</Grid>
	);
}
