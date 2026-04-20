fx_version 'cerulean'
games { 'gta5' }
lua54 'yes'

version '1.0.1'
repository 'https://github.com/Mythic-Framework/mythic-menu'

client_script "@mythic-base/components/cl_error.lua"
client_script "@mythic-pwnzor/client/check.lua"

client_scripts {
    'client/*.lua'
}
server_scripts {
    'server/*.lua'
}

files {
    "ui/html/*.*",
}

ui_page "ui/html/index.html"