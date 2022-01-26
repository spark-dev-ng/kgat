<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title></title>
    @if(env('APP_ENV') === 'local')
    <link rel="stylesheet" type="text/css" href="{{ENV('APP_URL')}}/css/app.css">
    @else
    <link rel="stylesheet" type="text/css" href="/public/css/app.css">
    @endif
</head>

<body>
    <div id="root"></div>
    <noscript>
        You need to enable JavaScript to run this app.
    </noscript>
    @if(env('APP_ENV') === 'local')
    <script src="{{ENV('APP_URL')}}/js/app.js"></script>
    @else
    <script src="/public/js/app.js"></script>
    @endif
</body>

</html>