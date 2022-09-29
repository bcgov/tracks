const colourChip = (theme, colour) => ({
	backgroundColor: colour,
	color: "white",
	textTransform: 'uppercase',
	fontWeight: 600,
	borderRadius: 4,
	lineHeight: 1.5,
	paddingLeft: theme.spacing(1),
	paddingRight: theme.spacing(1)
});

export {colourChip};
