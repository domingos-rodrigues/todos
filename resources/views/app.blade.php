<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Todos') }}</title>

        <!-- Fonts -->

        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" crossorigin="anonymous">

        <!-- Styles -->
        <link rel="stylesheet" href="{{ mix('css/app.css') }}">

        <!-- Scripts -->
{{--        @routes--}}
{{--        <script src="{{ mix('js/app.js') }}" defer></script>--}}
{{--        @inertiaHead--}}
    </head>
    <body class="font-sans antialiased">
{{--        @inertia--}}


        <div id="root"></div>

{{--        <script src="{{mix('js/app.js')}}"></script>--}}

    </body>

    <script src="{{ asset('js/manifest.js') }}"></script>
    <script src="{{ asset('js/vendor.js') }}"></script>
    <script src="{{ asset('js/app.js') }}"></script>
</html>
