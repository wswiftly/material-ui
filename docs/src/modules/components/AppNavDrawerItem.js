import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import { alpha, styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import ButtonBase from '@mui/material/ButtonBase';
import Link from 'docs/src/modules/components/Link';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import ToggleOffOutlinedIcon from '@mui/icons-material/ToggleOffOutlined';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

const iconsMap = {
  DescriptionIcon: ArticleOutlinedIcon,
  ToggleOnIcon: ToggleOffOutlinedIcon,
  CodeIcon: CodeRoundedIcon,
  BuildIcon: BuildOutlinedIcon,
  CreateIcon: CreateOutlinedIcon,
  VisibilityIcon: VisibilityOutlinedIcon,
  StyleIcon: ColorLensOutlinedIcon,
  AddIcon: AddCircleOutlineOutlinedIcon,
};

const Item = styled(({ component: Component = 'div', ...props }) => <Component {...props} />, {
  // disable `as` prop
  shouldForwardProp: () => true,
})(({ theme }) => ({
  ...theme.typography.body2,
  display: 'flex',
  borderRadius: 5,
  outline: 0,
  width: '100%',
  paddingTop: 5,
  paddingBottom: 5,
  justifyContent: 'flex-start',
  fontWeight: theme.typography.fontWeightMedium,
  transition: theme.transitions.create(['color', 'background-color'], {
    duration: theme.transitions.duration.shortest,
  }),
  '&:hover': {
    color: theme.palette.text.primary,
    backgroundColor:
      theme.palette.mode === 'dark'
        ? alpha(theme.palette.primaryDark[700], 0.4)
        : theme.palette.grey[50],
  },
  '&.Mui-focusVisible': {
    backgroundColor: theme.palette.action.focus,
  },
  [theme.breakpoints.up('md')]: {
    paddingTop: 5,
    paddingBottom: 5,
  },
}));

const ItemLink = styled(Item, {
  shouldForwardProp: (prop) => prop !== 'depth',
})(({ theme }) => {
  return {
    color: theme.palette.text.secondary,
    fontSize: '0.8125rem',
    '&.app-drawer-active': {
      // color: theme.palette.primary.main,
      color:
        theme.palette.mode === 'dark' ? theme.palette.primary[200] : theme.palette.primary[500],
      backgroundColor:
        theme.palette.mode === 'dark' ? theme.palette.primaryDark[600] : theme.palette.primary[50],
      fontWeight: 600,
      '&:hover': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity,
        ),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
        },
      },
      '&.Mui-focusVisible': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity,
        ),
      },
    },
    paddingLeft: 38,
  };
});

const ItemButtonIcon = styled(KeyboardArrowRightRoundedIcon, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ open, theme }) => {
  return {
    fontSize: '1rem',
    float: 'right',
    color: theme.palette.primary.main,
    transform: open && 'rotate(90deg)',
  };
});

const ItemButton = styled(Item, {
  shouldForwardProp: (prop) => prop !== 'depth',
})(({ depth, theme }) => {
  return {
    color: (() => {
      if (depth === 1) {
        if (theme.palette.mode === 'dark') {
          return alpha(theme.palette.grey[500], 0.5);
        }
        return theme.palette.grey[500];
      }
      return theme.palette.text.primary;
    })(),
    fontSize: depth === 1 ? '0.75rem' : undefined,
    fontWeight: depth === 0 ? 500 : 600,
    margin: theme.spacing(0.5, 0),
    '&:hover': {
      backgroundColor: depth === 0 ? '' : alpha(theme.palette.primary.main, 0),
      color: (() => {
        if (depth === 0) {
          return '';
        }
        if (theme.palette.mode === 'dark') {
          return alpha(theme.palette.grey[500], 0.5);
        }
        return theme.palette.grey[500];
      })(),
      cursor: depth === 0 ? '' : 'text',
    },
    [`&:hover ${ItemButtonIcon}`]: {
      color: theme.palette.text.primary,
    },
    ...(depth === 0
      ? {
          paddingLeft: 2,
          '& .KeyboardArrowRightRoundedIcon': {
            marginLeft: 'auto',
            marginRight: '5px',
          },
        }
      : {
          paddingLeft: 38,
        }),
  };
});

const StyledLi = styled('li', { shouldForwardProp: (prop) => prop !== 'depth' })(
  ({ theme, depth }) => {
    return {
      padding: depth === 0 ? '0 10px' : '2px 0',
      marginTop: depth === 0 ? theme.spacing(1) : undefined,
      display: 'block',
    };
  },
);

export default function AppNavDrawerItem(props) {
  const {
    children,
    depth,
    href,
    onClick,
    openImmediately = false,
    topLevel = false,
    title,
    linkProps,
    icon,
    ...other
  } = props;
  const [open, setOpen] = React.useState(openImmediately);
  const handleClick = () => {
    setOpen((oldOpen) => !oldOpen);
  };

  const hasIcon = icon && iconsMap[icon];
  const IconComponent = hasIcon ? iconsMap[icon] : React.Fragment;
  const iconProps = hasIcon ? { fontSize: 'small', color: 'primary' } : {};

  if (href) {
    return (
      <StyledLi {...other} depth={depth}>
        <ItemLink
          component={Link}
          activeClassName="app-drawer-active"
          href={href}
          underline="none"
          onClick={onClick}
          depth={depth}
          {...linkProps}
        >
          {title}
        </ItemLink>
      </StyledLi>
    );
  }

  return (
    <React.Fragment>
      <StyledLi {...other} depth={depth}>
        <ItemButton
          component={ButtonBase}
          depth={depth}
          disableRipple
          className={topLevel && 'algolia-lvl0'}
          onClick={handleClick}
        >
          {hasIcon && (
            <Box
              sx={{
                '& svg': { fontSize: '0.875rem' },
                display: 'flex',
                alignItems: 'center',
                height: '100%',
                marginRight: 1.5,
                py: 0.5,
                px: 0.5,
                borderRadius: '5px',
                backgroundColor: (theme) =>
                  theme.palette.mode === 'dark'
                    ? theme.palette.primaryDark[700]
                    : theme.palette.primary[50],
              }}
            >
              <IconComponent {...iconProps} />
            </Box>
          )}
          {title}
          {depth === 0 && <ItemButtonIcon open={open} className="KeyboardArrowRightRoundedIcon" />}
        </ItemButton>
        {depth === 0 ? (
          <Collapse in={open} timeout="auto" unmountOnExit>
            {children}
          </Collapse>
        ) : (
          children
        )}
      </StyledLi>
      {depth === 0 && <Divider sx={{ my: 1.2 }} />}
    </React.Fragment>
  );
}

AppNavDrawerItem.propTypes = {
  children: PropTypes.node,
  depth: PropTypes.number.isRequired,
  href: PropTypes.string,
  icon: PropTypes.string,
  linkProps: PropTypes.object,
  onClick: PropTypes.func,
  openImmediately: PropTypes.bool,
  title: PropTypes.string.isRequired,
  topLevel: PropTypes.bool,
};
