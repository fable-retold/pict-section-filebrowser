const libPictProvider = require('pict-provider');

const _DefaultProviderConfiguration =
{
	"ProviderIdentifier": "Pict-FileBrowser-Icons",
	"AutoInitialize": true,
	"AutoInitializeOrdinal": 0,
	"AutoSolveWithApp": true,
	"AutoSolveOrdinal": 0
};

// ---- Color palette ----
//
// Every entry is a CSS `var()` reference into pict-provider-theme tokens,
// with the original hand-picked hex as the fallback.  Hosts that install a
// theme provider get icons that re-skin with the theme; hosts that don't
// see the original warm-beige palette.
//
// SVG presentation attributes (`fill="..."`, `stroke="..."`) accept `var()`
// substitutions as paint values in modern browsers — same trick used by
// pict-section-code's syntax-token CSS.
const _Colors =
{
	Primary:   'var(--theme-color-icon-outline,      var(--theme-color-text-primary,         #3D3229))',
	Accent:    'var(--theme-color-icon-accent,       var(--theme-color-brand-primary,        #2E7D74))',
	Muted:     'var(--theme-color-icon-muted,        var(--theme-color-text-muted,           #8A7F72))',
	Light:     'var(--theme-color-icon-paper,        var(--theme-color-background-panel,     #F5F0E8))',
	WarmBeige: 'var(--theme-color-icon-folder,       var(--theme-color-background-tertiary,  #EAE3D8))',
	TealTint:  'var(--theme-color-icon-brand-tint,   var(--theme-color-background-secondary, #E0EDE9))',
	Lavender:  'var(--theme-color-icon-tint-cool,    var(--theme-color-background-secondary, #E8E0F0))',
	AmberTint: 'var(--theme-color-icon-tint-warm,    var(--theme-color-background-tertiary,  #F0E8D0))',
	PdfFill:   'var(--theme-color-icon-pdf-fill,     var(--theme-color-status-error-tint,    #F0DDDD))',
	PdfLabel:  'var(--theme-color-icon-pdf-label,    var(--theme-color-status-error,         #C04040))'
};

// ====================================================================
// FILE BROWSER ICON SET — multi-color glyphs with a warm, hand-drawn
// aesthetic, designed to share the look-and-feel of retold-content-system
// and similar Retold apps.  All SVGs use `viewBox="0 0 24 24"` and OMIT
// `width`/`height` attributes — sizing is controlled by `font-size` on
// the wrapping `.pict-icon` element (per the convention established by
// pict's core Icon provider).
//
// PascalCase names follow Pict's icon registry convention.  Names that
// would collide with core's monoline glyphs (Folder / File / FileText /
// FolderOpen / Home) are namespaced as `FileBrowser*` so consumers can
// pick which aesthetic they want — the section's warm-beige version OR
// pict core's monoline default.  File-type-specific glyphs (FilePdf,
// FileImage, FileCode, ...) don't collide, so they go in unprefixed.
// ====================================================================
const _IconSet =
{
	// ---- Folder + file shells (FileBrowser-namespaced overrides of
	// core Folder/File/FileText so installing this section doesn't
	// recolor every {~I:Folder~} reference elsewhere in the app). ----
	'FileBrowserFolder':
		'<svg viewBox="0 0 24 24" fill="none">' +
		'<path d="M3.2 7.1V17.2C3.2 18.2 4 19.1 5.1 18.9L19.1 19.1C20 19.1 20.9 18.2 20.8 17.1V9.1C20.9 8 20.1 7.1 19 7.1H12.1L10.1 4.9H5.1C3.9 5 3.1 5.9 3.2 7.1Z" fill="' + _Colors.WarmBeige + '" stroke="' + _Colors.Primary + '" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />' +
		'<path d="M3.2 9H20.8" stroke="' + _Colors.Primary + '" stroke-width="1" opacity="0.3" />' +
		'</svg>',

	'FileBrowserFolderOpen':
		'<svg viewBox="0 0 24 24" fill="none">' +
		'<path d="M3.2 7.1V17.2C3.2 18.2 4 19.1 5.1 18.9L19.1 19.1C20 19.1 20.9 18.2 20.8 17.1V9.1C20.9 8 20.1 7.1 19 7.1H12.1L10.1 4.9H5.1C3.9 5 3.1 5.9 3.2 7.1Z" fill="' + _Colors.WarmBeige + '" stroke="' + _Colors.Primary + '" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />' +
		'<path d="M3.2 10.2L5.8 17.8C6 18.4 6.6 18.9 7.2 18.9H19.8L22.1 11.2C22.3 10.6 21.8 10 21.2 10H5.2C4.6 10 4 10.4 3.8 11" stroke="' + _Colors.Primary + '" stroke-width="1.5" fill="' + _Colors.Light + '" stroke-linecap="round" stroke-linejoin="round" opacity="0.7" />' +
		'</svg>',

	'FileBrowserFile':
		'<svg viewBox="0 0 24 24" fill="none">' +
		'<path d="M14.1 2.1H6.2C5 2.2 4.1 3 4.1 4.1V20.1C4 21.2 5 22 6.1 21.9H18C19.1 22 20 21.1 19.9 19.9V8.1L14.1 2.1Z" fill="' + _Colors.Light + '" stroke="' + _Colors.Primary + '" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />' +
		'<path d="M13.9 2.1V8.2H20" stroke="' + _Colors.Primary + '" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />' +
		'</svg>',

	'FileBrowserFileText':
		'<svg viewBox="0 0 24 24" fill="none">' +
		'<path d="M14.1 2.1H6.2C5 2.2 4.1 3 4.1 4.1V20.1C4 21.2 5 22 6.1 21.9H18C19.1 22 20 21.1 19.9 19.9V8.1L14.1 2.1Z" fill="' + _Colors.Light + '" stroke="' + _Colors.Primary + '" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />' +
		'<path d="M13.9 2.1V8.2H20" stroke="' + _Colors.Primary + '" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />' +
		'<line x1="8.1" y1="12.8" x2="15.9" y2="12.8" stroke="' + _Colors.Muted + '" stroke-width="1.2" stroke-linecap="round" />' +
		'<line x1="8.1" y1="15.8" x2="15.9" y2="15.8" stroke="' + _Colors.Muted + '" stroke-width="1.2" stroke-linecap="round" />' +
		'<line x1="8.1" y1="18.8" x2="12.2" y2="18.8" stroke="' + _Colors.Muted + '" stroke-width="1.2" stroke-linecap="round" />' +
		'</svg>',

	'FileBrowserHome':
		'<svg viewBox="0 0 24 24" fill="none">' +
		'<path d="M3.1 9.6L12 3.1L20.9 9.6V19.9C20.9 20.5 20.5 21 19.9 20.9H4.1C3.5 21 3 20.5 3.1 19.9V9.6Z" fill="' + _Colors.TealTint + '" stroke="' + _Colors.Accent + '" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />' +
		'<rect x="9.2" y="14.1" width="5.6" height="6.9" rx="0.5" fill="' + _Colors.Accent + '" />' +
		'</svg>',

	// ---- File-type-specific glyphs (no core collision; unprefixed) ----
	'FileCode':
		'<svg viewBox="0 0 24 24" fill="none">' +
		'<path d="M14.1 2.1H6.2C5 2.2 4.1 3 4.1 4.1V20.1C4 21.2 5 22 6.1 21.9H18C19.1 22 20 21.1 19.9 19.9V8.1L14.1 2.1Z" fill="' + _Colors.Light + '" stroke="' + _Colors.Primary + '" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />' +
		'<path d="M13.9 2.1V8.2H20" stroke="' + _Colors.Primary + '" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />' +
		'<path d="M8.5 13.2L6.8 15.1L8.6 16.8" stroke="' + _Colors.Accent + '" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" />' +
		'<path d="M15.5 13.2L17.2 15.1L15.4 16.8" stroke="' + _Colors.Accent + '" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" />' +
		'<line x1="12.8" y1="12" x2="11.2" y2="18" stroke="' + _Colors.Muted + '" stroke-width="1.2" stroke-linecap="round" />' +
		'</svg>',

	'FileImage':
		'<svg viewBox="0 0 24 24" fill="none">' +
		'<rect x="3.1" y="3.2" width="17.8" height="17.7" rx="2" fill="' + _Colors.Lavender + '" stroke="' + _Colors.Primary + '" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />' +
		'<circle cx="8.3" cy="8.7" r="1.8" fill="' + _Colors.Accent + '" />' +
		'<path d="M20.8 15.2L15.9 10.1L5.2 20.8" stroke="' + _Colors.Primary + '" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round" />' +
		'</svg>',

	'FilePdf':
		'<svg viewBox="0 0 24 24" fill="none">' +
		'<path d="M14.1 2.1H6.2C5 2.2 4.1 3 4.1 4.1V20.1C4 21.2 5 22 6.1 21.9H18C19.1 22 20 21.1 19.9 19.9V8.1L14.1 2.1Z" fill="' + _Colors.PdfFill + '" stroke="' + _Colors.Primary + '" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />' +
		'<path d="M13.9 2.1V8.2H20" stroke="' + _Colors.Primary + '" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />' +
		'<text x="8.2" y="16.8" font-family="sans-serif" font-weight="700" font-size="6.5" fill="' + _Colors.PdfLabel + '" letter-spacing="-0.3">PDF</text>' +
		'</svg>',

	'FileSpreadsheet':
		'<svg viewBox="0 0 24 24" fill="none">' +
		'<path d="M14.1 2.1H6.2C5 2.2 4.1 3 4.1 4.1V20.1C4 21.2 5 22 6.1 21.9H18C19.1 22 20 21.1 19.9 19.9V8.1L14.1 2.1Z" fill="' + _Colors.TealTint + '" stroke="' + _Colors.Primary + '" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />' +
		'<path d="M13.9 2.1V8.2H20" stroke="' + _Colors.Primary + '" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />' +
		'<rect x="7.2" y="11.1" width="9.8" height="7.8" rx="0.5" fill="none" stroke="' + _Colors.Accent + '" stroke-width="1.2" />' +
		'<line x1="7.2" y1="13.7" x2="17" y2="13.7" stroke="' + _Colors.Accent + '" stroke-width="1" />' +
		'<line x1="7.2" y1="16.3" x2="17" y2="16.3" stroke="' + _Colors.Accent + '" stroke-width="1" />' +
		'<line x1="10.9" y1="11.1" x2="10.9" y2="18.9" stroke="' + _Colors.Accent + '" stroke-width="1" />' +
		'</svg>',

	'FileArchive':
		'<svg viewBox="0 0 24 24" fill="none">' +
		'<path d="M14.1 2.1H6.2C5 2.2 4.1 3 4.1 4.1V20.1C4 21.2 5 22 6.1 21.9H18C19.1 22 20 21.1 19.9 19.9V8.1L14.1 2.1Z" fill="' + _Colors.WarmBeige + '" stroke="' + _Colors.Primary + '" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />' +
		'<path d="M13.9 2.1V8.2H20" stroke="' + _Colors.Primary + '" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />' +
		'<rect x="8.8" y="11.2" width="2.5" height="2" rx="0.4" fill="' + _Colors.Primary + '" />' +
		'<rect x="8.8" y="14.2" width="2.5" height="2" rx="0.4" fill="' + _Colors.Primary + '" />' +
		'<rect x="8.8" y="17.2" width="2.5" height="2" rx="0.4" fill="' + _Colors.Primary + '" />' +
		'</svg>',

	'FileAudio':
		'<svg viewBox="0 0 24 24" fill="none">' +
		'<path d="M14.1 2.1H6.2C5 2.2 4.1 3 4.1 4.1V20.1C4 21.2 5 22 6.1 21.9H18C19.1 22 20 21.1 19.9 19.9V8.1L14.1 2.1Z" fill="' + _Colors.AmberTint + '" stroke="' + _Colors.Primary + '" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />' +
		'<path d="M13.9 2.1V8.2H20" stroke="' + _Colors.Primary + '" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />' +
		'<circle cx="10.2" cy="16.8" r="2.1" fill="none" stroke="' + _Colors.Accent + '" stroke-width="1.5" />' +
		'<path d="M12.2 16.8V11.2L16.1 10.1" stroke="' + _Colors.Accent + '" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none" />' +
		'<circle cx="16.1" cy="15.3" r="1.4" fill="none" stroke="' + _Colors.Accent + '" stroke-width="1.2" />' +
		'</svg>',

	'FileVideo':
		'<svg viewBox="0 0 24 24" fill="none">' +
		'<path d="M14.1 2.1H6.2C5 2.2 4.1 3 4.1 4.1V20.1C4 21.2 5 22 6.1 21.9H18C19.1 22 20 21.1 19.9 19.9V8.1L14.1 2.1Z" fill="' + _Colors.Lavender + '" stroke="' + _Colors.Primary + '" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />' +
		'<path d="M13.9 2.1V8.2H20" stroke="' + _Colors.Primary + '" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />' +
		'<path d="M9.8 12.2V18.2L15.8 15.2L9.8 12.2Z" fill="' + _Colors.Accent + '" stroke="' + _Colors.Accent + '" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />' +
		'</svg>',

	'FileWeb':
		'<svg viewBox="0 0 24 24" fill="none">' +
		'<circle cx="12" cy="12" r="8.9" fill="' + _Colors.TealTint + '" stroke="' + _Colors.Primary + '" stroke-width="1.8" />' +
		'<ellipse cx="12" cy="12" rx="4.1" ry="8.9" fill="none" stroke="' + _Colors.Primary + '" stroke-width="1.2" />' +
		'<line x1="3.1" y1="12" x2="20.9" y2="12" stroke="' + _Colors.Primary + '" stroke-width="1" />' +
		'<path d="M4.8 7.8C7 8.5 9.4 8.9 12 8.9C14.6 8.9 17 8.5 19.2 7.8" stroke="' + _Colors.Primary + '" stroke-width="1" fill="none" />' +
		'<path d="M4.8 16.2C7 15.5 9.4 15.1 12 15.1C14.6 15.1 17 15.5 19.2 16.2" stroke="' + _Colors.Primary + '" stroke-width="1" fill="none" />' +
		'</svg>',

	'FileConfig':
		'<svg viewBox="0 0 24 24" fill="none">' +
		'<path d="M14.1 2.1H6.2C5 2.2 4.1 3 4.1 4.1V20.1C4 21.2 5 22 6.1 21.9H18C19.1 22 20 21.1 19.9 19.9V8.1L14.1 2.1Z" fill="' + _Colors.Light + '" stroke="' + _Colors.Primary + '" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />' +
		'<path d="M13.9 2.1V8.2H20" stroke="' + _Colors.Primary + '" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />' +
		'<circle cx="12" cy="15" r="2.8" fill="none" stroke="' + _Colors.Muted + '" stroke-width="1.5" />' +
		'<line x1="12" y1="11" x2="12" y2="12.2" stroke="' + _Colors.Muted + '" stroke-width="1.3" stroke-linecap="round" />' +
		'<line x1="12" y1="17.8" x2="12" y2="19" stroke="' + _Colors.Muted + '" stroke-width="1.3" stroke-linecap="round" />' +
		'<line x1="14.8" y1="13.2" x2="15.8" y2="12.6" stroke="' + _Colors.Muted + '" stroke-width="1.3" stroke-linecap="round" />' +
		'<line x1="8.2" y1="17" x2="9.2" y2="16.4" stroke="' + _Colors.Muted + '" stroke-width="1.3" stroke-linecap="round" />' +
		'<line x1="14.8" y1="16.8" x2="15.8" y2="17.4" stroke="' + _Colors.Muted + '" stroke-width="1.3" stroke-linecap="round" />' +
		'<line x1="8.2" y1="13" x2="9.2" y2="13.6" stroke="' + _Colors.Muted + '" stroke-width="1.3" stroke-linecap="round" />' +
		'</svg>',

	// ---- Sort indicators — not present in pict core; FB ships its own ----
	'SortAscending':
		'<svg viewBox="0 0 24 24" fill="none">' +
		'<path d="M12 4.2L7.2 10.8H16.8L12 4.2Z" fill="' + _Colors.Primary + '" />' +
		'<path d="M12 19.8L7.2 13.2H16.8L12 19.8Z" fill="' + _Colors.Muted + '" opacity="0.35" />' +
		'</svg>',

	'SortDescending':
		'<svg viewBox="0 0 24 24" fill="none">' +
		'<path d="M12 4.2L7.2 10.8H16.8L12 4.2Z" fill="' + _Colors.Muted + '" opacity="0.35" />' +
		'<path d="M12 19.8L7.2 13.2H16.8L12 19.8Z" fill="' + _Colors.Primary + '" />' +
		'</svg>'
};

// ====================================================================
// LEGACY KEBAB-CASE → PASCALCASE ALIASES
// Kept so existing callers using the old kebab-case names continue to
// resolve.  Internal getIcon() and getIconForEntry() translate at
// runtime; the registered registry only holds the PascalCase forms.
// ====================================================================
const _LegacyNameMap =
{
	'folder':           'FileBrowserFolder',
	'folder-open':      'FileBrowserFolderOpen',
	'file':             'FileBrowserFile',
	'file-text':        'FileBrowserFileText',
	'home':             'FileBrowserHome',
	'file-code':        'FileCode',
	'file-image':       'FileImage',
	'file-pdf':         'FilePdf',
	'file-spreadsheet': 'FileSpreadsheet',
	'file-archive':     'FileArchive',
	'file-audio':       'FileAudio',
	'file-video':       'FileVideo',
	'file-web':         'FileWeb',
	'file-config':      'FileConfig',
	'sort-asc':         'SortAscending',
	'sort-desc':        'SortDescending',
	// UI glyphs the FB used to ship — now delegated to pict core
	'arrow-up':         'ArrowUp',
	'chevron-up':       'ChevronUp',
	'chevron-down':     'ChevronDown',
	'chevron-left':     'ChevronLeft',
	'chevron-right':    'ChevronRight',
	'search':           'Search'
};

// ====================================================================
// EXTENSION-TO-ICON-NAME MAP
// Values are PascalCase canonical names that resolve through the
// pict.providers.Icon registry — FB's section-specific glyphs are
// registered there at construction time, so a single lookup works.
// ====================================================================
const _ExtensionMap =
{
	// Images
	'.jpg': 'FileImage', '.jpeg': 'FileImage', '.png': 'FileImage',
	'.gif': 'FileImage', '.svg': 'FileImage', '.webp': 'FileImage',
	'.bmp': 'FileImage', '.ico': 'FileImage',

	// Documents / text
	'.txt': 'FileBrowserFileText', '.md': 'FileBrowserFileText',
	'.rtf': 'FileBrowserFileText', '.doc': 'FileBrowserFileText',
	'.docx': 'FileBrowserFileText',

	// PDF
	'.pdf': 'FilePdf',

	// Spreadsheets
	'.xls': 'FileSpreadsheet', '.xlsx': 'FileSpreadsheet',
	'.csv': 'FileSpreadsheet', '.ods': 'FileSpreadsheet',

	// Code
	'.js': 'FileCode', '.ts': 'FileCode', '.jsx': 'FileCode',
	'.tsx': 'FileCode', '.py': 'FileCode', '.rb': 'FileCode',
	'.java': 'FileCode', '.c': 'FileCode', '.cpp': 'FileCode',
	'.h': 'FileCode', '.go': 'FileCode', '.rs': 'FileCode',
	'.swift': 'FileCode', '.kt': 'FileCode', '.scala': 'FileCode',
	'.sh': 'FileCode', '.bash': 'FileCode', '.zsh': 'FileCode',
	'.php': 'FileCode', '.lua': 'FileCode', '.r': 'FileCode',
	'.sql': 'FileCode', '.pl': 'FileCode',

	// Web / markup
	'.html': 'FileWeb', '.htm': 'FileWeb', '.css': 'FileWeb',
	'.scss': 'FileWeb', '.less': 'FileWeb', '.xml': 'FileWeb',

	// Config
	'.json': 'FileConfig', '.yaml': 'FileConfig', '.yml': 'FileConfig',
	'.toml': 'FileConfig', '.ini': 'FileConfig', '.env': 'FileConfig',
	'.conf': 'FileConfig', '.cfg': 'FileConfig',

	// Archives
	'.zip': 'FileArchive', '.tar': 'FileArchive', '.gz': 'FileArchive',
	'.rar': 'FileArchive', '.7z': 'FileArchive', '.bz2': 'FileArchive',
	'.xz': 'FileArchive', '.tgz': 'FileArchive',

	// Audio
	'.mp3': 'FileAudio', '.wav': 'FileAudio', '.flac': 'FileAudio',
	'.ogg': 'FileAudio', '.aac': 'FileAudio', '.wma': 'FileAudio',
	'.m4a': 'FileAudio',

	// Video
	'.mp4': 'FileVideo', '.avi': 'FileVideo', '.mov': 'FileVideo',
	'.mkv': 'FileVideo', '.webm': 'FileVideo', '.wmv': 'FileVideo',
	'.flv': 'FileVideo', '.m4v': 'FileVideo'
};

// Wrapper CSS — sizes the FB's icon wrapper elements via `font-size`
// so they cooperate with pict-core's `.pict-icon { font-size:1em }`
// sizing convention.  No more svg-targeted width/height rules.
const _WrapperCSS = (
	'.pict-fb-svg-icon { display: inline-flex; align-items: center; justify-content: center; vertical-align: middle; }\n' +
	'.pict-fb-tree-icon    { font-size: 16px; }\n' +
	'.pict-fb-detail-icon  { font-size: 16px; }\n' +
	'.pict-fb-tree-toggle  { font-size: 10px; }\n' +
	'.pict-fb-icon-graphic { font-size: 36px; }\n'
);

/**
 * Icon provider for the file browser.
 *
 * Registers the FB's section-specific multi-color glyphs into the
 * pict-core Icon registry (`pict.providers.Icon`).  Once registered,
 * any consumer — including FB's own views — should reach for these
 * icons via the standard pict API:
 *
 *     pict.icon('FilePdf')                      // JS
 *     pict.icon('FileBrowserFolder')
 *     {~I:FileSpreadsheet~}                     // template tag
 *
 * The legacy `getIcon(name, size)` / `getIconForEntry(entry, size)`
 * methods are kept for back-compat — they translate the old
 * kebab-case names to PascalCase and delegate to `pict.icon()`.  New
 * code should call `pict.icon()` directly.
 */
class PictFileBrowserIconProvider extends libPictProvider
{
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);

		// Local copies so custom registrations don't mutate the
		// module-level data shared across providers.
		this._extensionMap = Object.assign({}, _ExtensionMap);
		this._iconSet      = Object.assign({}, _IconSet);

		this._registeredWithCore = false;
		this._cssInjected        = false;

		this._registerWithCore();
		this._injectWrapperCSS();
	}

	/**
	 * @private
	 * Register every FB-specific glyph into pict.providers.Icon under
	 * the 'Outline' variant.  Idempotent (guarded by a flag) — safe to
	 * call repeatedly.
	 */
	_registerWithCore()
	{
		if (this._registeredWithCore) return;
		if (!this.pict || !this.pict.providers || !this.pict.providers.Icon)
		{
			// Core Icon provider not present — only possible on very old
			// pict versions.  Fail loudly so the misconfiguration is
			// obvious instead of silently rendering empty icons.
			if (this.log && typeof (this.log.warn) === 'function')
			{
				this.log.warn('Pict-FileBrowser-Icons: pict.providers.Icon not present; '
					+ 'upgrade pict to >=1.0.368.  File browser icons will not render.');
			}
			return;
		}
		this.pict.providers.Icon.registerSet({ Outline: this._iconSet });
		this._registeredWithCore = true;
	}

	/**
	 * @private
	 * Inject font-size wrapper CSS for FB icon containers.  Sized via
	 * font-size to cooperate with pict-icon's `1em x 1em` svg sizing.
	 */
	_injectWrapperCSS()
	{
		if (this._cssInjected) return;
		if (this.pict && this.pict.CSSMap && typeof (this.pict.CSSMap.addCSS) === 'function')
		{
			this.pict.CSSMap.addCSS('PictFileBrowserIcons-Wrappers', _WrapperCSS, 200);
			this._cssInjected = true;
		}
	}

	/**
	 * @private
	 * Resolve an old-style or canonical icon name to the PascalCase
	 * form registered in pict.providers.Icon.
	 */
	_canonicalize(pName)
	{
		if (typeof (pName) !== 'string') return '';
		if (_LegacyNameMap[pName]) return _LegacyNameMap[pName];
		return pName;
	}

	/**
	 * Get an SVG icon string by name (legacy API; new callers should
	 * prefer `pict.icon(name)`).  Accepts old kebab-case names like
	 * 'folder', 'file-code' and translates them to the PascalCase
	 * names registered in pict.providers.Icon.
	 *
	 * @param {string} pName - Icon name (kebab-case or PascalCase)
	 * @param {number} [pSize=16] - Pixel size hint; emitted as
	 *                              font-size on the .pict-icon wrapper.
	 * @returns {string} Wrapped <span class="pict-icon"><svg/></span>
	 *                   ready to drop into innerHTML.
	 */
	getIcon(pName, pSize)
	{
		let tmpCanonical = this._canonicalize(pName);
		if (!tmpCanonical || !this.pict || typeof (this.pict.icon) !== 'function')
		{
			return '';
		}
		let tmpOpts = { variant: 'Outline' };
		if (typeof (pSize) === 'number' && pSize > 0)
		{
			tmpOpts.size = pSize;
		}
		return this.pict.icon(tmpCanonical, tmpOpts);
	}

	/**
	 * Get an SVG icon string for a file entry based on its type and
	 * extension.  Folder entries get the FileBrowserFolder glyph;
	 * everything else routes through the extension map (FilePdf,
	 * FileCode, ...) with a fallback to FileBrowserFile.
	 *
	 * @param {Object} pEntry - { Type, Extension, Icon }
	 * @param {number} [pSize=16] - Pixel size hint.
	 * @returns {string} Wrapped icon HTML.
	 */
	getIconForEntry(pEntry, pSize)
	{
		if (!pEntry) return '';

		// Explicit per-entry override wins.
		if (pEntry.Icon && typeof (pEntry.Icon) === 'string' && pEntry.Icon.indexOf('<svg') === 0)
		{
			return pEntry.Icon;
		}

		if (pEntry.Type === 'folder')
		{
			return this.getIcon('FileBrowserFolder', pSize);
		}

		let tmpExt = (pEntry.Extension || '').toLowerCase();
		if (tmpExt && this._extensionMap[tmpExt])
		{
			return this.getIcon(this._extensionMap[tmpExt], pSize);
		}

		return this.getIcon('FileBrowserFile', pSize);
	}

	/**
	 * Backwards-compatible alias for `getIcon` — predates the
	 * core/section separation; kept so old callers don't have to be
	 * updated in lockstep.
	 */
	getUIIcon(pName, pSize)
	{
		return this.getIcon(pName, pSize);
	}

	/**
	 * Register a custom glyph for this section.  Forwards to the core
	 * Icon registry.  Pass `pIcon` as either an SVG string (preferred)
	 * or a function returning one (legacy form — called with no args).
	 *
	 * @param {string} pName - Icon name (PascalCase recommended)
	 * @param {string|Function} pIcon - SVG string or legacy size-returning fn
	 * @returns {boolean}
	 */
	registerIcon(pName, pIcon)
	{
		if (!pName) return false;
		let tmpSvg = pIcon;
		if (typeof (pIcon) === 'function')
		{
			try { tmpSvg = pIcon(24); }
			catch (e) { return false; }
		}
		if (typeof (tmpSvg) !== 'string' || tmpSvg.indexOf('<svg') < 0)
		{
			return false;
		}
		if (!this.pict || !this.pict.providers || !this.pict.providers.Icon)
		{
			return false;
		}
		return this.pict.providers.Icon.register(pName, tmpSvg, { force: true });
	}

	/**
	 * Register a file-extension → icon-name mapping.
	 *
	 * @param {string} pExtension - Extension including dot ('.vue')
	 * @param {string} pIconName  - Canonical icon name (PascalCase)
	 */
	registerExtension(pExtension, pIconName)
	{
		if (!pExtension || !pIconName) return false;
		this._extensionMap[pExtension.toLowerCase()] = pIconName;
		return true;
	}

	/**
	 * @returns {Array<string>} Names of all FB-section glyphs (PascalCase).
	 */
	getIconNames()
	{
		return Object.keys(this._iconSet);
	}

	/**
	 * @returns {Object} Copy of the extension → icon-name map.
	 */
	getExtensionMap()
	{
		return Object.assign({}, this._extensionMap);
	}

	/**
	 * Legacy method — kept so callers expecting it don't error.  CSS
	 * injection now happens automatically in the constructor.
	 */
	injectCSS()
	{
		this._injectWrapperCSS();
	}
}

module.exports = PictFileBrowserIconProvider;

module.exports.default_configuration = _DefaultProviderConfiguration;
module.exports.IconSet      = _IconSet;
module.exports.ExtensionMap = _ExtensionMap;
module.exports.Colors       = _Colors;
