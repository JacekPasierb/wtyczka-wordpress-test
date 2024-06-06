<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * Localized language
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'local' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', 'root' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',          'fK$%)U$Y<:/bwcZ0K|`%q$XNfwU=O+FXsuhe rM2D?e;GC}U:rr~M&x9^*!Y+kAT' );
define( 'SECURE_AUTH_KEY',   'zN~F5g;Aa-?jkf<vMcDdA|wJU7y^[nrq!*Q:UCS~4_KdL#d>%3Volz_YfqLa(Ct{' );
define( 'LOGGED_IN_KEY',     ']O~ L3[2}ux+=Fnz$^>Od2JZ)8c8z1!q:}kR}yf -{}cUTVpWcJ!XdA@xWU}oxC<' );
define( 'NONCE_KEY',         'oQ<VX])^)rKx5OkawbxUQ[2[;f?#_iKo?Tmkf<J<dm[R!RVA&18X Rzskz87E+BJ' );
define( 'AUTH_SALT',         '}UX9W9,3$.Ixf|`Bh!bQ>3!t:8;`8rj%]e.R?V?4Feu(3JZNe};uyHJ6_4nGo{n~' );
define( 'SECURE_AUTH_SALT',  'i$kS@cYiw{Q1R=rLUgS)-Ex#n DkwgXQ58PMIdQJCtl^KUI`{9ysV-yDH6A2>u9~' );
define( 'LOGGED_IN_SALT',    'Y:Dke L_m^1-iy4kaL:7_S0~xrZh_sSO78Wl9]kbCt cyD7)X3_-X`{>&JRt30p)' );
define( 'NONCE_SALT',        'R<ezsFDT~cF0_e>c,dQ:?!Au?-A=+B5o;q5Zh>yqR)ldgT#?}P6` &4KGy/_(fS:' );
define( 'WP_CACHE_KEY_SALT', '!n~#C7(Ox@iF!0drM=bbtK?pn|v/d>DA~I4j:oDJreF5>s`}eCUe#5kG3#deto(J' );


/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';


/* Add any custom values between this line and the "stop editing" line. */



/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
if ( ! defined( 'WP_DEBUG' ) ) {
	define( 'WP_DEBUG', false );
}

define( 'WP_ENVIRONMENT_TYPE', 'local' );
/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
