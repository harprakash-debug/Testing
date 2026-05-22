<?php

namespace App\Console\Commands;

use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;


#[Signature('app:insert-data')]
#[Description('Command description')]
class InsertData extends Command
{
    /**
     * Execute the console command.
     */
    public function handle()
    {
        Artisan::call('db:seed');
    }
}
