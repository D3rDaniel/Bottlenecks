<?php

namespace App\Http\Controllers\API;

use App\Models\Status;

class StatusController
{
    /**
     * Display all Statuses
     *
     */
    public function index()
    {
        $status = Status::get();

        if($status->isEmpty()){
            return response()->json(['message' => 'No statuses found'], 404);
        }

        return response()->json([$status],200);
    }
}
