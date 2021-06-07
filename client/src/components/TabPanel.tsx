import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
};

const a11yProps = (index: any) => {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
};

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: 224,
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
}));

export const VerticalTabs: React.VFC<{
    dataList: string[];
    selectedItem: string;
    onClick: (index: number) => void;
    children: React.ReactNode;
}> = ({ dataList, onClick, selectedItem, children }) => {
    const classes = useStyles();
    const value = dataList.indexOf(selectedItem);

    return (
        <div className={classes.root}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                aria-label="Vertical tabs example"
                className={classes.tabs}
            >
                {dataList.map((item, idx) => {
                    return (
                        <Tab
                            label={item}
                            onClick={() => onClick(idx)}
                            key={item}
                            {...a11yProps(idx)}
                        />
                    );
                })}
            </Tabs>
            {dataList.map((item, idx) => {
                return (
                    <TabPanel value={value} index={idx} key={item}>
                        {children}
                    </TabPanel>
                );
            })}
        </div>
    );
};
